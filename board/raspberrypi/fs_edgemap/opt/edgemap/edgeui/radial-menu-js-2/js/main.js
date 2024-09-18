'use strict';

var menuItems = [
    {
        id   : 'setlocation',
        title: 'Set location',
        icon: '#svg-icon-my-location'
    },
    {
        id   : 'terrain',
        title: 'Terrain',
        icon: '#svg-icon-terrain'
    },
    {
        id   : 'sendimage',
        title: 'Image',
        icon: '#svg-icon-camera'
    },
    {
        id   : 'meshtasticnodes',
        title: 'Meshtastic',
        icon: '#svg-icon-meshtastic'
    },
    {
        id   : 'reticulum',
        title: 'Reticulum',
        icon: '#svg-icon-reticulum'
    },
    {
        id   : 'more',
        title: 'More...',
        icon: '#svg-icon-more',
        items: [
            {
                id   : 'language',
                title: 'Language',
                icon: '#svg-icon-language',
                    items: [
                    {
                        id   : 'language-en',
                        title: 'English',
                        icon: '#svg-icon-language-en'
                    },
                    {
                        id   : 'language-zh',
                        title: 'Chinese',
                        icon: '#svg-icon-language-zh'
                    },
                    {
                        id   : 'language-ukr',
                        title: 'Ukraine',
                        icon: '#svg-icon-language-ukr'
                    },
                    {
                        id   : 'language-ar',
                        title: 'Arabic',
                        icon: '#svg-icon-language-ar'
                    },
                    {
                        id   : 'language-de',
                        title: 'German',
                        icon: '#svg-icon-language-de'
                    },
                    {
                        id   : 'language-es',
                        title: 'Spanish',
                        icon: '#svg-icon-language-es'
                    },
                    {
                        id   : 'language-fr',
                        title: 'France',
                        icon: '#svg-icon-language-fr'
                    },
                    {
                        id   : 'language-ru',
                        title: 'Russia',
                        icon: '#svg-icon-language-ru'
                    },
                    {
                        id   : 'language-he',
                        title: 'Hebrew',
                        icon: '#svg-icon-language-he'
                    }
                    
                ]
            },
            {
                id   : 'coordinate',
                title: 'Coord search',
                icon: '#svg-icon-coordinate-search'
            },
            {
                id   : 'about',
                title: 'About',
                icon: '#svg-icon-about'
            },
            
        ]
    },
    {
        id: 'message',
        title: 'Message',
        icon: '#svg-icon-message',
        
    }
];

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
window.onload = function ()
{
	const radialMenu = new RadialMenu(menuItems, 250, {
        ui: {
				classes: {
					menuOpen: "open",
					menuClose: "close"
				}
        },
		parent: document.body,
		closeOnClick: true,
		closeOnClickOutside: true,
		onClick: function(item)
		{
			console.log('You have clicked:', item.id, item.title);
			// console.log(item);
            
            if ( item.id == "setlocation" ) {
                 setManualLocationNotifyMessage();
            }
            if ( item.id == "terrain" ) {
                 toggleHillShadow();
            }
            if ( item.id == "language" ) {
                 openLanguageSelectBox();
            }
            if ( item.id == "coordinate" ) {
                 openCoordinateSearchEntryBox();
            }
            if ( item.id == "reticulum" ) {
                 toggleReticulumList();
            }
            if ( item.id == "message" ) {
                 openMessageEntryBox();
            }
            if ( item.id == "meshtasticnodes" ) {
                 toggleRadioList();
            }
            if ( item.id == "sendimage" ) {
                 clickSendImageForm();
            }
            
            
            if ( item.id == "language-en" ) {
                 changeLanguage('en');
            }
            if ( item.id == "language-zh" ) {
                 changeLanguage('zh');
            }
            if ( item.id == "language-ukr" ) {
                 changeLanguage('uk');
            }
            if ( item.id == "language-ar" ) {
                 changeLanguage('ar');
            }
            if ( item.id == "language-de" ) {
                 changeLanguage('de');
            }
            if ( item.id == "language-es" ) {
                 changeLanguage('es');
            }
            if ( item.id == "language-fr" ) {
                 changeLanguage('fr');
            }
            if ( item.id == "language-ru" ) {
                 changeLanguage('ru');
            }
            if ( item.id == "language-he" ) {
                 changeLanguage('he');
            } 
            
            
            
            
		}
	});
	document.getElementById('topRightMenuButton').addEventListener('click', function(event)
	{
		radialMenu.open();
	});
	/*document.getElementById('closeMenu').addEventListener('click', function(event)
	{
		radialMenu.close();
	});*/
	const radialContextMenu = new RadialMenu(// 2nd RadialMenu with different {menuItems}
		menuItems,
		200,
		{
			multiInnerRadius: 0.2,
			ui: {
				classes: {
					menuContainer: "menuHolder2",
					menuCreate: "menu2",
					menuCreateParent: "inner2",
					menuCreateNested: "outer2",
					menuOpen: "open2",
					menuClose: "close2"
				},
				nested: {
					title: false
				}
			}
	});
	document.addEventListener('contextmenu', function(event)
	{ // right-mouse(as context-menu) opened at position[x,y] of mouse-click
		event.preventDefault();
		if (radialContextMenu.isOpen())
		{
			return;
		}
		radialContextMenu.open(event.x, event.y);
	});
};
