# Dividends Module

Documentation valid for version 2.0

---

This is document is an overview of the dividends module, but mostly focuses on the service layer.

It goes together with [Diagrams.net (Formerly Draw.io)](https://diagrams.net/) diagrams, so I suggest you install that plugin for your IDE ([WebStorm](https://plugins.jetbrains.com/plugin/15635-diagrams-net-integration), [VSCode](https://marketplace.visualstudio.com/items?itemName=hediet.vscode-drawio)) for a smooth viewing experience.

## File Structure

---

### Service Layer

The [Dividends Module Service](/src/services/investors/dividends/api/DividendsModule.ts) is located in the [dividends](/src/services/investors/dividends) directory as per our archaic file structure.

The *investors* directory in the path denotes STO/project admin panel services, although this doesn't make much sense.

* **/api** Defines the interface between the service layer and the upper layers. Not to be confused with API endpoints. You can read the [Module Interface](/src/services/investors/dividends/api/IDividendsModule.ts) doc comments to learn about what each module function does.
* **/dto** Contains data types used by the module to communicate to the upper layers
* **/data** Contains data services used inside of the module, typically SQL
* **/data/strategies** Contains methods used to distribute dividends, all extending the strategy [interface](../data/strategies/IStrategyService.ts) and instantiated by the strategy [factory](../data/strategies/StrategyFactory).

### Controllers

The module controllers are under [dividendsCtl](/src/controllers/admin/dividendsCtl). [**Documentation**](/src/controllers/admin/dividendsCtl/documentation/dividendsCtl.md)

* **dividendsCtl** contains web action controllers
* **index.ts** groups all sub-controllers under dividendsCtl so that they can be accessed like object properties on dividendsCtl like`dividendsCtl.getIndex`
* **/api** contains API endpoint action controllers

### Router

The module routes are defined in [DividendsRouter.ts](/src/communication/stoAdminRouter/DividendsRouter.ts)
Relies on `common.isAdminUserAuthenticated` to grant access to routes based on session data. This works for the API endpoints too.

### Views

Located in [here](/views/admin/dividends/v2). [**Documentation**](/views/admin/dividends/v2/documentation/dividendsViews.md)

## Data Model

---

[SQL ER Diagram](dividends.drawio)

## Contents

---

<!-- TOC -->
  - [Documentation valid for version 2.0](#documentation-valid-for-version-20)
- [File Structure](#file-structure)
  - [Service Layer](#service-layer)
  - [Controllers](#controllers)
  - [Router](#router)
  - [Views](#views)
- [Data Model](#data-model)
- [Contents](#contents)
<!-- /TOC -->
