## Cypress recorder<br>Devtools extension

This is a project created to help visualize e2e tests in a more simplistic way, idea is to allow anyone without technical knowledge to record and describe test cases. Making it easier for developers to apply them to cypress.



## Roadmap

##### App setup
- [x] Create new svelte app
- [x] Install typescript
- [x] Install tailwind
##### Devtools integration 
- [x] Create manifest.json file
- [ ] Record dom events
    - [x] Create background script to load content script
    - [x] Create content script
    - [x] Create devtools script to append new tab
    - [x] Listen to all events
    - [ ] Send events to app
    - [ ] Receive events from app
##### App features 
- [ ] Design app
    - [ ] Design app structure with tabs / steps ( Record, Export )
    - [ ] Design Record tab / step
        - [ ] Test section
            - [ ] Description
            - [ ] Actions
                - [ ] Draggable
                - [ ] Edit description
                - [ ] Delete
                - [ ] Export?
        - [ ] Event card
            - [ ] Event description
            - [ ] Event type
            - [ ] Event actions
                - [ ] Draggable
                - [ ] Edit
                - [ ] Test / Highlight
                - [ ] Delete
                - [ ] Export?
- [ ] Components
    - [ ] Section
    - [ ] Card
    - [ ] Actions

## Development

Install dependencies

```bash
npm install
```

Then start [Rollup](https://rollupjs.org):

```bash
npm run dev
```

Go to chrome **extensions > load unpacked** and select project's dist folder on your computer.


## Building and running in production mode

To create an optimised version of the app:

```bash
npm run build
```