# Trika Megamenu

  Trika Megamenu app is for configure and manage megamenu on the storefront.

## Configuration

  1. Install this app (`trika.megamenu`) in the desired account
  3. To use this app or override the default CSS you need to import it in your dependencies on `manifest.json` file:

  ```json
    "dependencies": {
      "trika.megamenu": "0.x"
    }
  ```
  Then, add `megamenu` block to your code to display megamenu.


## Customization

  1. Create a file called `trika.megamenu.css` inside the `styles/css` folder. Add your custom styles:

  ```css
  .megamenu {
    margin-top: 10px;
  }
  ```
  
  2. In order to apply CSS customizations in this and other blocks, follow the instructions given in the recipe on [Using CSS Handles for store customization]      (https://vtex.io/docs/recipes/style/using-css-handles-for-store-customization).

  | CSS Handles             |
  | ----------------------- |
  | `megamenu`              |
  | `dropdownContainer`     | 
  | `thirdMenu`             |
  | `fourthMenu`            |
  | `navigation`            |
  | `dropdownWrapper`       |
  | `firstMenu`             |
  | `firstMenuItems`        |
  | `firstLevelActive`      |
  | `secondMenu`            |
  | `secondMenuItems`       |
  | `secondMenuIcon`        |
  | `secondLevelActive`     |
  | `secondLevelLink`       |
  | `secondLevelLinkActive` |
  | `viewAllFirstLevel`     |
  | `viewAllSecondLevel`    |
  | `thirdMenuItems`        |
  | `thirdLevelLink`        |
  | `thirdLevelActive`      |
  | `active`                |
  | `fourthMenuItems`       |
  | `fourthLevelLink`       |
  | `fourthLevelActive`     |
  | `promotional`           |
  | `image`                 |
  | `content`               |
  | `title`                 |
  | `link`                  |
