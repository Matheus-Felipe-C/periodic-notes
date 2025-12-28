# Periodic Notes plugin ✅

A simple plugin that helps you create and open regularly recurring notes — daily, weekly, monthly, quarterly, and yearly — using templates you already have.

This project was inspired by the [Obsidian Periodic Notes plugin](https://github.com/liamcain/obsidian-periodic-notes).

---

## Quick start ✨
1. Install the plugin in your app.
2. Create one or more templates (for example, a "Weekly" template and a "Monthly" template).
3. In the plugin settings, tell the plugin which template to use for each frequency (Daily / Weekly / Monthly / Quarterly / Yearly) through the note UUID of the template.
4. Use the plugin commands (for example: **Open weekly note**) to open or create the note for the selected period.

That's it — the plugin will create a new note from the template if it doesn't already exist.

---

## How it helps you 🔧
- Automatically create a new note for each day, week, month, quarter, or year from a template.
- Open the note for the current period quickly using the plugin commands or Quick Open.
- Use placeholders (wildcards) in the template name to create unique, readable note names automatically.

---

## Template placeholders (wildcards) 💡
You can put these tokens in the **template name** to make note names change automatically:

- `{{YYYY}}` → 4-digit year (example: **2025**)
- `{{YY}}` → 2-digit year (example: **25**)
- `{{MMM}}` → full month name (example: **October**)
- `{{MM}}` → 2-digit month (example: **06**)
- `{{M}}` → month number without leading zero (example: **6**)
- `{{DD}}` → 2-digit day (example: **01**)
- `{{D}}` → day without leading zero (example: **1**)
- `{{[Q]}}` → quarter (example: **Q1**, **Q2**, **Q3**, **Q4**)

Examples:
- Template name: `Weekly - {{YYYY}} {{MM}}-W{{D}}` → Note created: `Weekly - 2025 10-W6` (if appropriate for your naming)
- Template name: `Monthly - {{YYYY}} {{MMM}}` → Note created: `Monthly - 2025 October`

> Tip: Use `{{YYYY}}` and `{{MMM}}` together for clear, human-friendly names like `October 2025`.

---

## Using the plugin 📝
- Open a note for the current period: use the command **Open daily note**, **Open weekly note**, **Open monthly note**, **Open quarterly note**, or **Open yearly note**.
- If a note for that period doesn't exist, the plugin creates it from the corresponding template.
- You can find and run these commands from your app's Quick Open feature.

---

## Troubleshooting ⚠️
- If the plugin doesn't create notes, check that you set a template for that period in the plugin settings.
- If you have a very large number of notes and things feel slow, this is a known area for improvement (we're working on optimizing checks for existing notes).
- If you don't know how to find a template's UUID or ID: open the note on the web app, and copy anything after `notes/` on the URL.
   - Alternatively, press `Ctrl + Shift + O` and copy the note identifier presented on the note details screen.

---

## Developer notes (for contributors) 👩‍💻
- Tests: Run `NODE_OPTIONS=--experimental-vm-modules npm test`.
- For continuous testing during development:

```bash
NODE_OPTIONS=--experimental-vm-modules npm run test -- --watch
```

- The project uses esbuild for bundling and Jest for tests.

---

## Roadmap & ideas 📅
- Improve performance for users with many notes.
- Add a simple UI to set templates without leaving the plugin settings (work in progress).
- More wildcards or customizable naming options.

---

If anything in this README is unclear, or you'd like an example tailored to your app's setup, open an issue on Github or leave a comment on the plugin page.
