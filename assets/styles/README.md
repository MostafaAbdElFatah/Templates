# Color tokens

`base.css` is the single source of truth for colors and shadows:

1. `--palette-*` variables hold raw colors and alpha variants. Keep these values
   centralized; do not add raw color literals to component styles.
2. Semantic `--color-*` and `--shadow-*` variables describe UI roles. Define
   every semantic role in `:root` and give it a deliberate value in
   `[data-theme="dark"]`. Keep the role stable when its value changes by theme.
3. Components should consume semantic tokens. Add a component-level color token
   only for a genuinely unique appearance, and make it reference a semantic
   token.

The site starts in system mode. The appearance selector and
`window.themeController.setPreference("system" | "light" | "dark")` update the
document theme. Explicit selections are stored under `template-color-theme`;
system mode follows `prefers-color-scheme`. The small synchronous script in the
document head applies the saved or system-resolved theme before the stylesheet
is rendered to avoid a flash of the wrong theme.

## Supplied palette mapping

- `#ececec` → `--palette-gray-250`; `#ddd` → `--palette-gray-400`;
  `#000000` → `--palette-black`; `#ffffff` → `--palette-white`.
- `#fafafa` → `--palette-gray-50`; `#e9e6e6` → `--palette-gray-warm-275`;
  `#777777` → `--palette-gray-700`; `#e6e6e7` → `--palette-gray-cool-300`.
- `rgb(0 0 0 / 13%)` → `--palette-black-13`;
  `rgb(255 255 255 / 20%)` → `--palette-white-20`;
  `#cccccc` → `--palette-gray-500`.
- `rgb(244 64 54 / 60%)` → `--palette-red-60`;
  `#f44036` → `--palette-red`; `#009688` → `--palette-teal`.
- `rgb(3 169 244 / 60%)` → `--palette-blue-light-60`;
  `#03a9f4` → `--palette-blue-light`; `#ffc107` → `--palette-amber`.
- `#f3f3f3` → `--palette-gray-175`; `#e4e4e4` → `--palette-gray-350`;
  `#d5d5d5` → `--palette-gray-450`; `#f9f9f9` → `--palette-gray-75`.
- `#eeeeee` → `--palette-gray-200`; `#f6f5f5` → `--palette-gray-warm-100`;
  `#ededed` → `--palette-gray-225`; `#d4d4d4` → `--palette-gray-475`.
- `#f6f6f6` → `--palette-gray-100`; `#f4f4f4` → `--palette-gray-150`;
  `#e2e2e2` → `--palette-gray-375`.
- `rgb(23 135 224 / 97%)` → `--palette-blue-secondary-97`;
  `#191919` → `--palette-gray-950`; `#313131` → `--palette-gray-900`.
- `#1877f2` → `--palette-blue-facebook`; `#1da1f2` →
  `--palette-blue-twitter`; `#ff0000` → `--palette-red-pure`.
- `#444444` → `--palette-gray-800`; `#b9b9b9` → `--palette-gray-550`.
- The supplied `0px 2px 4px 0px rgb(0 0 0 / 12%)` shadow is preserved as
  `--shadow-original`.

The earlier site palette is retained as primitives where it differs from the
supplied set, including the blue brand shades, teal, dark blue-gray, and
portfolio placeholder colors. Exact duplicate values share one primitive.
