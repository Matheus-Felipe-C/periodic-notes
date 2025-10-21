# Periodic Notes plugin
A plugin for automatically creating daily, weekly, quarterly and monthly notes based on existing templates.

# Roadmap
- [ ] Minimum plugin to be published to the plugin directory
   - [ ] Check if there are notes created on app startup
   - [ ] Auto create daily jots with template
      - [ ] Needs to be in the format that Amplenote supports for daily jots to avoid duplication
   - [ ] Auto create weekly notes every Sunday with template
   - [ ] Auto create monthly notes every 1st day of the month with template
- [ ] Auto create quarterly notes with template
- [ ] Allow automatically naming notes with wildcard values
   - [ ] `{{YYYY}}`: 4-digit year (ex: 2025)
   - [ ] `{{YY}}`: 2-digit year(ex: 25)
   - [ ] `{{MMM}}`: full month name (ex: October)
   - [ ] `{{MM}}`: 2-digit month (ex: 06)
   - [ ] `{{M}}`: current month (ex: 6)
   - [ ] `{{DD}}`: 2-digit day (ex: 01)
   - [ ] `{{D}}`: current day (ex: 21)
   - [ ] `{{[Q]}}`: transforms into the quarter
- [ ] Function to edit the plugin options without moving to the plugin settings page

## Testing

Run `NODE_OPTIONS=--experimental-vm-modules npm test` to run the tests.

If it complains about jsdom being absent, run `npm install -D jest-environment-jsdom` and try again.

### Run tests continuously as modifying the plugin

```bash
NODE_OPTIONS=--experimental-vm-modules npm run test -- --watch
```

## Technologies used to help with this project

* https://esbuild.github.io/getting-started/#your-first-bundle
* https://jestjs.io/
