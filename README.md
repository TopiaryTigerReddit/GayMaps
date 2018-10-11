# GayMaps
GayMaps lets you find your LGBT places easily wherever you are!

The purpose of the map is to show some items from OpenStreetMap database about LGBT community in order to help people in finding them.

As of now, the following tags are detected:
* Gay friendly places (```gay=welcome```)
* Gay places (```gay=yes```)
* Gay-only places (```gay=only```)

Support to gay male (```gay:male=*```) and gay female (```gay:female=*```) places will come soon.

Moreover, the following tags are detected:
* Condom vending machines (```amenity=vending_machine``` + ```vending=condoms```)

## Contribute
The code is partly based on [OpenLoveMap](https://github.com/thomersch/OpenLoveMap) source code. Feel free to helo thomersch's project too. The data are based on [OpenStreetMap.org](https://openstreetmap.org), so I encourage users to freely edit the map in order to improve data.

Feel free to [open bug reports](https://github.com/airon90/GayMaps/issues) and to contribute with [pull requests](https://github.com/airon90/GayMaps/pulls)!

A translation of the website is to come. Follow [this bug report](https://github.com/airon90/GayMaps/issues/3) in order to know more about that.

## Build
1. Create a new token from [Mapbox](http://mapbox.com).
2. Download the entire repo.
3. Edit [```static/js/gaymap.js```](https://github.com/airon90/GayMaps/blob/master/static/js/gaymap.js#L146-L150) and replace ```YOURTOKENHERE``` with the token from Mapbox.
4. Run ```index.html``` in a updated browser.

## Licenses
As the code is partly based on [OpenLoveMap](https://github.com/thomersch/OpenLoveMap) source code, I must respect its license but as of 2018-09-30, [there is no official license](https://github.com/thomersch/OpenLoveMap/issues/4).

The data are based on [OpenStreetMap.org](https://openstreetmap.org), which are published under [ODbL license](https://opendatacommons.org/licenses/odbl/).
