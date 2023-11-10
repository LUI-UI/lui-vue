# Changelog

All notable changes to this project will be documented in this file..

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## Unreleased

## [0.70.1](https://github.com/LUI-UI/lui-vue/compare/v0.70.0...v0.70.1) (2023-11-10)


### Bug Fixes

* **checkbox:** fix types by adding number as value type ([a723691](https://github.com/LUI-UI/lui-vue/commit/a72369182183b64ed5f2e58d81e2d32901fe9780))
* **composables:** fix composable structure ([816d5af](https://github.com/LUI-UI/lui-vue/commit/816d5af59805df342d5bbeab60b88d446594e338)), closes [#158](https://github.com/LUI-UI/lui-vue/issues/158)
* **menu-components:** control open state on menu components ([600195a](https://github.com/LUI-UI/lui-vue/commit/600195a2167062b8a37359377ba9e53a588537fd))

## [0.70.0](https://github.com/LUI-UI/lui-vue/compare/v0.69.5...v0.70.0) (2023-10-16)


### Features

* **select,multiselect,popover,dropdown:** create teleport prop to render menus with fixed position ([e3a1333](https://github.com/LUI-UI/lui-vue/commit/e3a13336bded5165e747e857ec551895c849d1c8))


### Bug Fixes

* **client:** fix typescript error ([6108ba7](https://github.com/LUI-UI/lui-vue/commit/6108ba7d55e4ce2c36b6bfc4e21612d2ec4557ee))
* **components:** add classnames to all missing components ([6ddfbaf](https://github.com/LUI-UI/lui-vue/commit/6ddfbaf2c16d195cdd507c5d9e3de313cf94ee13))
* **multiselect:** fix isValuUsing check ([ca0f7a4](https://github.com/LUI-UI/lui-vue/commit/ca0f7a4eeaa5da611fff7fbc3b507205c1cb9dc9))
* **select,multi-select:** handle usage of different text and value ([4057128](https://github.com/LUI-UI/lui-vue/commit/40571283d9874c6854bc1971f326777436c19b89))

## [0.69.5](https://github.com/LUI-UI/lui-vue/compare/v0.69.4...v0.69.5) (2023-09-27)


### Bug Fixes

* **multi-select:** fix model-value changes bug ([ab79f9f](https://github.com/LUI-UI/lui-vue/commit/ab79f9fbf9214f0b7d0dc1af3edc1109db34c96f))
* **release.yaml:** fix release yaml ([416c8b7](https://github.com/LUI-UI/lui-vue/commit/416c8b7c735f45a2cdeea220f000673df1500718))

## [0.69.4](https://github.com/LUI-UI/lui-vue/compare/v0.69.3...v0.69.4) (2023-09-19)


### Bug Fixes

* **popover:** add on-trigger event to popover component ([cd6d697](https://github.com/LUI-UI/lui-vue/commit/cd6d6971daafd0b91382c97237bebd3f66175462))

## [0.69.3](https://github.com/LUI-UI/lui-vue/compare/v0.69.2...v0.69.3) (2023-09-11)


### Bug Fixes

* **dropdown,popover:** add center positions to dropdown and popover menus ([5296b75](https://github.com/LUI-UI/lui-vue/commit/5296b755237205174c4e96eea638f78806b356e1))
* **menuitem:** add new options for menuitem tag prop ([6e6fef8](https://github.com/LUI-UI/lui-vue/commit/6e6fef858a2c6d84b604f54bdecb30b4a704208e))

## [0.69.2](https://github.com/LUI-UI/lui-vue/compare/v0.69.1...v0.69.2) (2023-09-06)


### Bug Fixes

* **inputs:** fix inputs change event parameter ([0059c71](https://github.com/LUI-UI/lui-vue/commit/0059c71b6d0f232bcbb71b31c2c44dac6ff19ec5))

## [0.69.1](https://github.com/LUI-UI/lui-vue/compare/v0.69.0...v0.69.1) (2023-08-31)


### Bug Fixes

* **multiselet:** fix searchable prop when using placeholder ([c12d4d1](https://github.com/LUI-UI/lui-vue/commit/c12d4d16dacc5ba69764eddd7b10a2e1bc04f229))
* **popover:** fix popover component block prop ([6ad70bb](https://github.com/LUI-UI/lui-vue/commit/6ad70bbf55291c977140f981193236e3108d6391))

## [0.69.0](https://github.com/LUI-UI/lui-vue/compare/v0.68.2...v0.69.0) (2023-08-24)


### Features

* **multi-select:** create multi-select component ([e7a553c](https://github.com/LUI-UI/lui-vue/commit/e7a553c9c01462f6a0777a88c303013bc2ba2a2f))


### Bug Fixes

* **checkbox:** fix checkbox components custom-value error ([a01ae1f](https://github.com/LUI-UI/lui-vue/commit/a01ae1f4429d9951183754e31bc9948b09b50fd9))
* **multi-select:** export multi-select ([ae68359](https://github.com/LUI-UI/lui-vue/commit/ae68359b1c6633d7aae48b89591785df948af734))
* **type:** fix type error ([d3afbf0](https://github.com/LUI-UI/lui-vue/commit/d3afbf03bbfae7cbfc95e1976e61366569689666))

## [0.68.2](https://github.com/LUI-UI/lui-vue/compare/v0.68.1...v0.68.2) (2023-08-23)


### Bug Fixes

* **focustrap:** change focus-trap composable with the vue-use focusTrap component ([313d798](https://github.com/LUI-UI/lui-vue/commit/313d798a9bca20b180ca9fb65b9598c6cddd663e))
* **inputs:** add missing events to input components(checkbox,radio,input) ([36d74ce](https://github.com/LUI-UI/lui-vue/commit/36d74ce687742fbaca147fc7900a40f0ad9596f6))
* **select:** fix options missing bug ([9bcad48](https://github.com/LUI-UI/lui-vue/commit/9bcad486585d03ca33c7804657bb548dc24c4ce8)), closes [#102](https://github.com/LUI-UI/lui-vue/issues/102)
* **switch:** add custom value support to switch component ([99eecfa](https://github.com/LUI-UI/lui-vue/commit/99eecfabe0417cc8b6d140284c7f1507b54f81a1))

## [0.68.1](https://github.com/LUI-UI/lui-vue/compare/v0.68.0...v0.68.1) (2023-08-08)


### Bug Fixes

* **popover:** fix popover z-index issue ([fd62c07](https://github.com/LUI-UI/lui-vue/commit/fd62c077a1b110ff4582fe655a8711bac589a2e0))

## [0.68.0](https://github.com/LUI-UI/lui-vue/compare/v0.67.2...v0.68.0) (2023-08-01)


### Features

* **sidebar:** create sidebar component ([7a8961b](https://github.com/LUI-UI/lui-vue/commit/7a8961b1fb71c5a31f476d86e06286e9683aedaa))


### Bug Fixes

* **useproperposition:** fix proper position bug ([c6f59ef](https://github.com/LUI-UI/lui-vue/commit/c6f59ef6c652b683ac74367db19f848393b0a13f))

## [0.67.2](https://github.com/LUI-UI/lui-vue/compare/v0.67.1...v0.67.2) (2023-07-20)


### Bug Fixes

* **popover:** fix popover focus-trap bug ([1d5d71c](https://github.com/LUI-UI/lui-vue/commit/1d5d71c66e6734712226e2dd4ddb2a04d9593495))

## [0.67.1](https://github.com/LUI-UI/lui-vue/compare/v0.67.0...v0.67.1) (2023-07-19)


### Bug Fixes

* **popover:** add block prop ([f0e488c](https://github.com/LUI-UI/lui-vue/commit/f0e488c91176fdaa54d8f13fc7069400f2b51df0))

## [0.67.0](https://github.com/LUI-UI/lui-vue/compare/v0.66.1...v0.67.0) (2023-07-12)


### Features

* **tab:** make tab-buttons and tab-button customizable ([f840558](https://github.com/LUI-UI/lui-vue/commit/f840558cfb8e56cea6ee6368a499faef4f1f3cb0))


### Bug Fixes

* **popover:** close popover when click an item in popover menu ([1ac01d0](https://github.com/LUI-UI/lui-vue/commit/1ac01d0a03ce8c10bf16a13dc9333c6e4201fda1))

## [0.66.1](https://github.com/LUI-UI/lui-vue/compare/v0.66.0...v0.66.1) (2023-07-11)


### Bug Fixes

* **avatar:** change avatar sizes ([87386b8](https://github.com/LUI-UI/lui-vue/commit/87386b8b770ea75a58984375e0ed399bbaed8007))

## [0.66.0](https://github.com/LUI-UI/lui-vue/compare/v0.65.2...v0.66.0) (2023-07-11)


### Features

* **popover:** create popover component ([a47ae58](https://github.com/LUI-UI/lui-vue/commit/a47ae5897207aa9c6466eab9ac2bf3949dee489d))


### Bug Fixes

* **popover:** fix popover storybook ([2a7c942](https://github.com/LUI-UI/lui-vue/commit/2a7c942bb33dcc3dc7c1a51c02cf9f860c935e5a))

## [0.65.2](https://github.com/LUI-UI/lui-vue/compare/v0.65.1...v0.65.2) (2023-07-09)


### Bug Fixes

* **dropdown:** fix lint ([a0e8b4b](https://github.com/LUI-UI/lui-vue/commit/a0e8b4b57e315d9bd6f958e2469c21ee5355a379))
* **radio:** fix radio initial selection bug ([f86a241](https://github.com/LUI-UI/lui-vue/commit/f86a241f67a661585975850946b2ebec3293c801))

## [0.65.1](https://github.com/LUI-UI/lui-vue/compare/v0.65.0...v0.65.1) (2023-06-25)


### Bug Fixes

* **luibutton:** fix LuiButton Tag types ([#148](https://github.com/LUI-UI/lui-vue/issues/148)) ([cb11cf6](https://github.com/LUI-UI/lui-vue/commit/cb11cf6ce412d962e91f3717bd20fa65c839a050))

## [0.65.0](https://github.com/LUI-UI/lui-vue/compare/v0.64.3...v0.65.0) (2023-06-25)


### Features

* **modal:** add a prop to make removeable border-radius ([c355a79](https://github.com/LUI-UI/lui-vue/commit/c355a794a055ea5df1f45d622de6cfb967049dd4))
* **modal:** add fullScreen prop ([84249fe](https://github.com/LUI-UI/lui-vue/commit/84249fe5c9bef35672d50632969cb476a2aa674b))
* **modal:** add padding prop to make padding removeable ([6dff519](https://github.com/LUI-UI/lui-vue/commit/6dff519be34cc6826da0c1034780fa8846362a79))
* **modal:** change lui-modal size ([342aa80](https://github.com/LUI-UI/lui-vue/commit/342aa80969866359b6f478e03d33e0091d1bc1e0))
* **overlay:** create overlay component ([1fac52a](https://github.com/LUI-UI/lui-vue/commit/1fac52a99e4151f8a4ec6a3ec5f54a04393152bb))
* **properposition/composable:** improve properPosition composable to more accurate positions ([96131c6](https://github.com/LUI-UI/lui-vue/commit/96131c685e5ff07cd08842baf07ea1acbba0c09f))
* **storybook:** add Chromatic for storybook and docs deployment ([#147](https://github.com/LUI-UI/lui-vue/issues/147)) ([79150cb](https://github.com/LUI-UI/lui-vue/commit/79150cbce1466f107070b4c5b5ada96cd9b388cc))
* **tag:** added tag component and tag components story ([1c0a8fe](https://github.com/LUI-UI/lui-vue/commit/1c0a8fed504c64a892cc1a654fb03a9e724feaf5))
* **tag:** added tag composable and removed border prop ([0db6d9f](https://github.com/LUI-UI/lui-vue/commit/0db6d9f853d4d416ed466db15960b2815480f848))


### Bug Fixes

* **button:** add a and span in button tag types ([#141](https://github.com/LUI-UI/lui-vue/issues/141)) ([6d4ca77](https://github.com/LUI-UI/lui-vue/commit/6d4ca77d4698c86b121c806af54ed2f1142c298a))
* **checkbox:** fix chcekbox error ([eb84357](https://github.com/LUI-UI/lui-vue/commit/eb8435777c2aeca289b63edcb3e5e71a90a9b7af))
* **checkbox:** fix value type error, add custom value support ([cf7b8a6](https://github.com/LUI-UI/lui-vue/commit/cf7b8a679a3fe144c15409f529a04c2767bf883b))
* exports and yarn to pnpm ([2f04253](https://github.com/LUI-UI/lui-vue/commit/2f042530f9314c534546ef6bc0770f23cf5b66bb))
* **menudropdown:** fix menudropdown block prop issue ([c125571](https://github.com/LUI-UI/lui-vue/commit/c12557157f9f6b7d447c6726ce46fd562d03e6eb))
* **menudropdown:** fix prepend, append slots ([0c5fb5a](https://github.com/LUI-UI/lui-vue/commit/0c5fb5a7f69ce1edad0d02d74f0681c2f8d416cb))
* **modal:** made available to add custom close button ([fa4e498](https://github.com/LUI-UI/lui-vue/commit/fa4e4989c290cd36e6e1522bb5fb33588821e1e5))
* **option:** fixed options font size changes while selects size changed ([3664aaa](https://github.com/LUI-UI/lui-vue/commit/3664aaaae1404d05ba3da4540b21d16f393d0c8c))
* **overlay:** add new props to complete component ([382dad0](https://github.com/LUI-UI/lui-vue/commit/382dad03309400cae1ede5f9e6fe56dc85752054))
* **overlay:** change overlay component to compatible modals ([1ec2858](https://github.com/LUI-UI/lui-vue/commit/1ec2858bdd6eebff0616e0c575456563e21be566))
* **overlay:** fix overlay type importing ([2edcb30](https://github.com/LUI-UI/lui-vue/commit/2edcb30e58e61449e884a77d80e17d0e6b2feeaa))
* pnpm version ([#146](https://github.com/LUI-UI/lui-vue/issues/146)) ([48a6a9d](https://github.com/LUI-UI/lui-vue/commit/48a6a9da7f21792833b7367d247ac7857a42e22b))
* release yarn to pnpm ([df2f6e7](https://github.com/LUI-UI/lui-vue/commit/df2f6e7263ff2d4a90a801fdd481d1bb61bd0163))
* **select:** add prepend slot and make prepend slot closable ([82ea1ef](https://github.com/LUI-UI/lui-vue/commit/82ea1ef6cd78f69b22ad39724da6a1219f2f2dac))
* **select:** fix change event initial trigger issue ([43d3d0f](https://github.com/LUI-UI/lui-vue/commit/43d3d0f90520992094aed2c8a98e690852faf337))
* **select:** fix nothing found text always shown issue ([81a39ff](https://github.com/LUI-UI/lui-vue/commit/81a39ffa9e7894e83e1ebc36d84f7a9539dde3f7))
* **select:** fix select disable state ([231df6b](https://github.com/LUI-UI/lui-vue/commit/231df6bbcaf6e27c2b8f0f267d2f90f632331713))
* **select:** fix state-icon bug ([ccadcd4](https://github.com/LUI-UI/lui-vue/commit/ccadcd424303abd9e6272556b4895b93206110b0))
* **storybook:** change build storuybook script ([#136](https://github.com/LUI-UI/lui-vue/issues/136)) ([9f4c309](https://github.com/LUI-UI/lui-vue/commit/9f4c30964e2bca1447fbbe8dca4c0c6ba7c42c46))
* **storybook:** change storybook deploy script in package.json ([f0a71c9](https://github.com/LUI-UI/lui-vue/commit/f0a71c9e9d10b6bd3c6af3fc48c1e04f9b1b13eb))
* **storybook:** clear unused argtypes ([4a15bd6](https://github.com/LUI-UI/lui-vue/commit/4a15bd63d32446788bf7733991d0cd66e622aa39))
* **tag:** fix tags padding issues and transfer classes in composables ([bc4cdb5](https://github.com/LUI-UI/lui-vue/commit/bc4cdb55abea328cf36778a99ae5d7aa1f2c8ab3))

## [0.64.3](https://github.com/LUI-UI/lui-vue/compare/v0.64.2...v0.64.3) (2023-05-31)


### Bug Fixes

* **utils:** change hasSlotContent utils ([cc1728b](https://github.com/LUI-UI/lui-vue/commit/cc1728be144d497ccef4b8c6a27636dc6b1cc46e))

## [0.64.2](https://github.com/LUI-UI/lui-vue/compare/v0.64.1...v0.64.2) (2023-05-30)


### Bug Fixes

* **select:** deleted unnecessary data showing ([4679f40](https://github.com/LUI-UI/lui-vue/commit/4679f409d9a42919485c027fdd4c882af0ddddcf))
* **select:** deleted unnecessery showing data ([9581c61](https://github.com/LUI-UI/lui-vue/commit/9581c61b27a874cc60d72c46b54ebe6c0e19a38c))

## [0.64.1](https://github.com/LUI-UI/lui-vue/compare/v0.64.0...v0.64.1) (2023-05-30)


### Bug Fixes

* **modal:** fix modal aria-labelledby issue ([34943b3](https://github.com/LUI-UI/lui-vue/commit/34943b3118e74870b49128f9d4a7439856fe93c3))

## [0.64.0](https://github.com/LUI-UI/lui-vue/compare/v0.63.13...v0.64.0) (2023-05-30)


### Features

* **lui-modal:** changing modal mobile visuals and added arialabelledby dynamically ([48c79cf](https://github.com/LUI-UI/lui-vue/commit/48c79cfe1109de6e877eeda095a92e17d5603f02))
* **select:** add searchable future to select ([d709b37](https://github.com/LUI-UI/lui-vue/commit/d709b3759920c5cc8969dfd27b70166589c0d6af))


### Bug Fixes

* **input:** fix same time usage bug value and v-model ([05164b5](https://github.com/LUI-UI/lui-vue/commit/05164b5fc681c35012f1938beb642b10cdab040a))
* **lui-modal:** fix scroll canceling when modal closed ([731792f](https://github.com/LUI-UI/lui-vue/commit/731792f3c695cf5ffe8d0264632dd03e05c0c800))
* **lui-modal:** fix scroll canceling when modal closed ([559ffc7](https://github.com/LUI-UI/lui-vue/commit/559ffc7c8a6aa4c9d113b34e55a93422e4d5fda1))
* **luicheckbox:** checkbox check icon dark mode color fix ([d8a116c](https://github.com/LUI-UI/lui-vue/commit/d8a116c0791cc04bae220fe49122746c13593f3c)), closes [#73](https://github.com/LUI-UI/lui-vue/issues/73)
* **luimenudropdown:** add focus feature to custom trigger ([a825df8](https://github.com/LUI-UI/lui-vue/commit/a825df8211f96fb8c80fddc7863676da5674b9aa)), closes [#50](https://github.com/LUI-UI/lui-vue/issues/50)
* **luimenudropdown:** fix dropdown trigger bug ([7d0c8d7](https://github.com/LUI-UI/lui-vue/commit/7d0c8d75ef9142d1e22f6d543ae45ea9a72de2a8)), closes [#50](https://github.com/LUI-UI/lui-vue/issues/50)
* **select:** fix scroll issue when navigate with keyboard on select options ([335c0b9](https://github.com/LUI-UI/lui-vue/commit/335c0b9c760a422145a30781e3db21cb7cb90b85))
* **select:** fix select keyboard navigation issue ([20efc92](https://github.com/LUI-UI/lui-vue/commit/20efc925ee2bf64083a809c651066cbc4ac50495))

## [0.63.13](https://github.com/LUI-UI/lui-vue/compare/v0.63.12...v0.63.13) (2023-05-18)


### Bug Fixes

* **input:** remove 'X' icon from search input ([73693af](https://github.com/LUI-UI/lui-vue/commit/73693af25b2ebe3c56c3d6b5395ec46b5d12b971))

## [0.63.12](https://github.com/LUI-UI/lui-vue/compare/v0.63.11...v0.63.12) (2023-05-17)


### Bug Fixes

* **release:** fix release typo issue ([49abdfc](https://github.com/LUI-UI/lui-vue/commit/49abdfc6a7d2e73f8fadb0d782e00987bbf81d80))
* **stroybook:** remove storybook deprecated argtypes ([be5cc2f](https://github.com/LUI-UI/lui-vue/commit/be5cc2fba2b4253d8f38441f92af8e2c3fb2320d))
* Update release.yaml ([9433c19](https://github.com/LUI-UI/lui-vue/commit/9433c191f61410925f647cf4ea0eb5a707f10f34))

## [0.63.11](https://github.com/LUI-UI/lui-vue/compare/v0.63.10...v0.63.11) (2023-05-17)


### Bug Fixes

* **option:** remove unnecesary line ([b898cfa](https://github.com/LUI-UI/lui-vue/commit/b898cfa6c2d8363def519f72d16e1ae2bd9c17f0))
* **publish.yaml:** add github and npm release to publish.yaml file ([585f7ae](https://github.com/LUI-UI/lui-vue/commit/585f7aeb8f76cf130f7650314ee6d85e8b5b6919))

## [0.63.10](https://github.com/LUI-UI/lui-vue/compare/v0.63.9...v0.63.10) (2023-05-17)


### Bug Fixes

* **option:** remove unnecesary lines ([98cf083](https://github.com/LUI-UI/lui-vue/commit/98cf0831aff210a2949b970af78097ad342404c5))

## [0.63.9](https://github.com/LUI-UI/lui-vue/compare/v0.63.8...v0.63.9) (2023-05-17)


### Bug Fixes

* **option:** add cursor-pointer to option ([b72347b](https://github.com/LUI-UI/lui-vue/commit/b72347bec8d99ff6afaff52c44146afe62f25325))

## [0.63.8](https://github.com/LUI-UI/lui-vue/compare/v0.63.7...v0.63.8) (2023-05-17)


### Bug Fixes

* **button:** remove console.logs from button composable ([9da74d2](https://github.com/LUI-UI/lui-vue/commit/9da74d28ee8fcc42c7c4c783121d93eb3e0f3451))
* **modal:** fix modal scroll overflow issue ([a95216c](https://github.com/LUI-UI/lui-vue/commit/a95216c2a0035089d540cfe01abf7fccd522e402))
* **workflows:** change release action ([326dded](https://github.com/LUI-UI/lui-vue/commit/326dded06463f45d9c222454c2f84b8e9d550e5a))

## [0.63.7](https://github.com/LUI-UI/lui-vue/compare/v0.63.6...v0.63.7) (2023-05-11)


### Bug Fixes

* **package.json:** change prepare commands to be more specific ([420fc99](https://github.com/LUI-UI/lui-vue/commit/420fc99adc7da7afc2327bb1d6913dc663eb0d9f))

## [0.63.6](https://github.com/LUI-UI/lui-vue/compare/v0.63.5...v0.63.6) (2023-05-09)


### Bug Fixes

* **usefocustrap.ts:** fix a minor typo ([bb911ed](https://github.com/LUI-UI/lui-vue/commit/bb911ed3b2939575611c0603819347caacfb2f16))

## [0.63.5](https://github.com/LUI-UI/lui-vue/compare/v0.63.4...v0.63.5) (2023-05-09)


### Bug Fixes

* **usefocustrap.ts:** typo3 ([8947cbc](https://github.com/LUI-UI/lui-vue/commit/8947cbce26770d95f6a803c8aa4fe819468bc702))

## [0.63.4](https://github.com/LUI-UI/lui-vue/compare/v0.63.3...v0.63.4) (2023-05-09)


### Bug Fixes

* **usefocustrap.ts:** typo ([4490de6](https://github.com/LUI-UI/lui-vue/commit/4490de62ba4315e9c80fb7c65678a4c8ef18aad9))

## [0.63.3](https://github.com/LUI-UI/lui-vue/compare/v0.63.2...v0.63.3) (2023-05-09)


### Bug Fixes

* **usefocustrap.ts:** typo2 ([a07544f](https://github.com/LUI-UI/lui-vue/commit/a07544f59fd73caf85650dbffa8be33edea142eb))

## [0.63.2](https://github.com/LUI-UI/lui-vue/compare/v0.63.1...v0.63.2) (2023-05-09)


### Bug Fixes

* **usefocustrap.ts:** typo ([06f7f76](https://github.com/LUI-UI/lui-vue/commit/06f7f76e24dbfd8e28c8d499cc772aeb5e394b6b))

## [0.63.1](https://github.com/LUI-UI/lui-vue/compare/v0.63.0...v0.63.1) (2023-05-09)


### Bug Fixes

* **typo:** typo ([725698a](https://github.com/LUI-UI/lui-vue/commit/725698a6cfc63735274ee64a607a5eb1f6a689c0))

## [0.63.0](https://github.com/LUI-UI/lui-vue/compare/v0.62.0...v0.63.0) (2023-05-09)


### Features

* **github:** create pull request template ([8777125](https://github.com/LUI-UI/lui-vue/commit/8777125ca5f330b4bdefc2913d71777bf2e8be8c))


### Bug Fixes

* **switch:** remove unccessary lines ([3918670](https://github.com/LUI-UI/lui-vue/commit/3918670cdf6381f5895c05d266b6313896168b4e))

## [0.62.0](https://github.com/LUI-UI/lui-vue/compare/v0.61.6...v0.62.0) (2023-05-09)


### Features

* **release:** add github version notes in release.yml ([4c45230](https://github.com/LUI-UI/lui-vue/commit/4c452303985118752cece15d071f9ecb5f3fadd0))


### Bug Fixes

* **button/story:** remove uncessary lines ([179821a](https://github.com/LUI-UI/lui-vue/commit/179821afc099011e4f0067bf3c7e1501c21f2761))
* **release.yml:** fix release type ([f3e1435](https://github.com/LUI-UI/lui-vue/commit/f3e1435bc43f6e01b05514bd63df4c660bcb6fbf))
* **release.yml:** fix release.yml file to update changelog ([13b5ac3](https://github.com/LUI-UI/lui-vue/commit/13b5ac37822dc9ae6c4a7b8656710d5857c39201))
* **release:** add checkout step to release-please step in the release.yml ([fedcc57](https://github.com/LUI-UI/lui-vue/commit/fedcc57956f330883a7a6d1fc0b46e3eef583239))
* **release:** add token to release.yml file ([2cc0e80](https://github.com/LUI-UI/lui-vue/commit/2cc0e80fe47c1041fa830e8df9cda9d547d5b930))
* **release:** change release yaml to update github versionlog ([2634dbc](https://github.com/LUI-UI/lui-vue/commit/2634dbc3f361ed7a2581dfedeaa6cc5d0d9d0a8b))
* **release:** change release.yml file ([100447c](https://github.com/LUI-UI/lui-vue/commit/100447c26c4570aa3fc4e37aa1059ca11c008715))
* **release:** change release.yml file ([2dbcbc9](https://github.com/LUI-UI/lui-vue/commit/2dbcbc92703e778180ab83b440dd5d0cdcd9ae19))
* **release:** change token provider in release yml ([d4dc2d0](https://github.com/LUI-UI/lui-vue/commit/d4dc2d006850d59f073f0e0dd3b6411753f46814))
* **switch/story:** remove unnecessary lines ([d2f3b41](https://github.com/LUI-UI/lui-vue/commit/d2f3b41e1ffeb98ad16489fc82effe05af620516))

## [0.61.6](https://github.com/LUI-UI/lui-vue/compare/v0.61.5...v0.61.6) (2023-05-08)


### Bug Fixes

* **button/story:** remove uncessary lines ([179821a](https://github.com/LUI-UI/lui-vue/commit/179821afc099011e4f0067bf3c7e1501c21f2761))
* **release.yml:** fix release type ([f3e1435](https://github.com/LUI-UI/lui-vue/commit/f3e1435bc43f6e01b05514bd63df4c660bcb6fbf))
* **release.yml:** fix release.yml file to update changelog ([13b5ac3](https://github.com/LUI-UI/lui-vue/commit/13b5ac37822dc9ae6c4a7b8656710d5857c39201))
* **release:** add token to release.yml file ([2cc0e80](https://github.com/LUI-UI/lui-vue/commit/2cc0e80fe47c1041fa830e8df9cda9d547d5b930))
* **release:** change release.yml file ([2dbcbc9](https://github.com/LUI-UI/lui-vue/commit/2dbcbc92703e778180ab83b440dd5d0cdcd9ae19))
* **release:** change token provider in release yml ([d4dc2d0](https://github.com/LUI-UI/lui-vue/commit/d4dc2d006850d59f073f0e0dd3b6411753f46814))

## 0.61.2 - 2023-05-08

## 0.61.1 - 2023-05-08
### Added
- Changelog
