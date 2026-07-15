# Zephyr + Metro: writeup & feedback

## How Zephyr fits into the React Native build pipeline

**Short version:** Metro still does all the bundling. Zephyr is a thin layer that
wraps the Metro config and hooks the *output* of a Module Federation build,
uploading each federated bundle to the cloud and rewriting the remote URLs so a
host resolves them from Zephyr instead of from a hardcoded host/port.

### Where it sits

```
your code ──▶ Metro (transform + bundle) ──▶ Module Federation
                                                (container + exposed chunks + mf-manifest.json)
                                                      │
                                                      ▼
                                                withZephyr()  ──▶  Zephyr Cloud
                                                (upload bundles, version them,     (hosts the remote
                                                 rewrite remote URLs)               + manifest at a URL)
```

Concretely, in this repo the composition is:

```js
withModuleFederation(
  mergeConfig(getDefaultConfig(__dirname), config),
  await withZephyr()({ name, exposes/remotes, shared, shareStrategy }),
  { flags: { /* metro MF patches */ } },
)
```

- **Metro** is unchanged — it transforms TS/JSX and produces the JS bundle.
- **`@module-federation/metro`** turns one app into a *host* or a *remote*: it
  emits a container entry, splits `exposes` into separately-loadable chunks, and
  writes an `mf-manifest.json` describing what the app exposes/consumes and which
  dependencies are `shared`.
- **`withZephyr()`** takes the same MF options. At **deploy** time (the
  `bundle-mf-remote` command) it uploads the remote's bundle + manifest to Zephyr
  Cloud and gives it a versioned, hosted URL. For a **host**, the
  `"zephyr:dependencies"` field in `package.json` tells Zephyr which deployed
  remote to wire in, so the host binary resolves `mini@…/mf-manifest.json` from
  the cloud rather than `localhost:8082`.

So Zephyr is **not** a bundler and not a replacement for Metro. It sits *after*
the bundle/manifest are produced and owns **distribution + versioning** of the
federated remotes. Its value only shows up once you use Module Federation — for
a plain single-bundle RN app there is nothing for it to distribute.

### How I'd use it in a real project

The headline benefit is **shipping JS updates to independently-deployable
remotes without going through the app stores**. A realistic setup:

- Split the app into a thin host (native shell, navigation, shared providers)
  plus feature remotes (e.g. `checkout`, `profile`) owned by different teams.
- Each remote deploys to Zephyr on its own cadence; the host pins remotes via
  `zephyr:dependencies` mapped to environments (staging/prod), so you get
  per-remote versioning, preview URLs per branch, and rollback.
- Keep `react`/`react-native` as `singleton` shared deps so the host and every
  remote share one copy at runtime — this is the part that most needs care
  (version skew between a remote and the host's native binary is the main risk
  with OTA-style federation, so shared version pinning + `shareStrategy` matter).
- Locally, develop against plain Module Federation (no cloud); flip to Zephyr
  (`ZC=1`) only for deploys. This repo is structured exactly that way
  (`metro.mf.config.js` vs `metro.zc.config.js`).

---

## Developer-experience & documentation feedback

Context: fresh `apps/host` + `apps/mini` (RN 0.86), community CLI, following
<https://docs.zephyr-cloud.io/bundlers/metro>. Overall the pieces compose
cleanly *once configured correctly* — the manifest and host bundle both built on
the first try. First what went well, then the rough edges.

### What went well
- **Installation, running the app, and consuming the deployed remotes all worked
  on the first try.** Once the config was in place, `npm install`, launching the
  app, deploying to Zephyr Cloud, and having the host resolve both remotes from
  their hosted URLs each succeeded without a retry.
- `with-zephyr` correctly detected Metro and wrapped the config idempotently.
- Once versions were pinned, `withZephyr()` + `withModuleFederation()` composed
  without fuss; the `mf-manifest.json` exposed the right module and the host
  bundle embedded the remote entry on the first build.
- The `metro.mf` / `metro.zc` split (from the example) is a genuinely nice
  pattern for keeping local dev decoupled from the cloud.

### Rough edges

#### 1. `bundle-mf-remote` forces Zephyr auth even for a local build
The `react-native.config.js` in the doc wraps the command in
`zephyrCommandWrapper` **unconditionally**, so *every* `bundle-mf-remote` run —
including a plain local one — blocks on an interactive browser OAuth and, if you
haven't logged in, dies with `Auth timeout`. There's no documented `ZC` toggle
for the community-CLI command (the RNEF example has `build:android` vs
`build:android:zephyr`, but that split isn't reflected in the community-CLI
config the doc gives you). It's surprising that you can't produce a remote bundle
without a Zephyr account. **Suggestion:** gate the wrapper on an env flag in the
documented config, and mention `zephyr login` up front. (This repo does exactly
that — `react-native.config.js` only routes through Zephyr when `ZC=1`.)

#### 2. Community CLI feels second-class vs RNEF
`zephyr-metro-plugin` peer-depends on `@rnef/tools`, the example repo is
all-RNEF, and the community-CLI path is the one with the rough edges above. If
RNEF is the recommended path, the Metro doc could say so; if the community CLI is
fully supported, the example repo should include a community-CLI variant.
