TODO refactor:
[ ] zoom - use css transform: scale() instead recomputation?
[ ] divide DesignSlice into 3 independent slices (objects, project, calendar)?
[ ] plant with dashed border?
[ ] zoom předělat taky na lokální a až po mouseup vložit do reduxu
[ ] změnit "SeedBedsSlice->createNewSeedBedAction->rowsDirection" podle defaultního nastavení! (Aktuálně se tam prostě vkládá ROWDIRECTIONS.LEFT_TO_RIGHT)
Lint
rename all reducers to end with word Action

__________________________________________________________
### Zákl. Funkcionality
[ ] autosave
__________________________________________________________
### Object creation
[ ] mód pokládání plant pomocí více klikání (uživatel vybere plant a kliká všude kam se mají vkládat jednotlivé rostliny) - nemusí po každé pokládce znovu vybírat rostlinu; mohlo by být realizováno při výběru plants switchem mezi módy - Pozn: jednotlivé rostliny by asi neměli mít FieldEditDialog? Minimálně ne tak podrobný... - možná switch mezi create plant/seedbed
[ ] Možnost kliknutí i táhnutí v seznamu
[ ] při pokládání při kliknutí vložit velikost o jedné rostlině (tak aby se zobrazil move handler i size handler), příp nějaká minimální u malých crop. Možná při resize nastavit minimální velikost na jednu rostlinu?
#### Object types
[ ] plants
[ ] paths
[ ] irrigation
[ ] other objects
[ ] field ?
[ ] shapes
[ ] text

__________________________________________________________
### Levé menu (pro vytváření objektů)
[ ] hideable (with transition)
__________________________________________________________
### DesignView
[ ] přidat kompas + rotace celého view
[ ] Scale přesunovatelné, ale bez funkce zoomu (jestli tak ted funguje)
[ ] metr do tools
[ ] field splitter, joiner, clipper (css clip path to change to different shape)

[ ] solve click on multiple plant section (which will be selected if they are stacked?)


__________________________________________________________
### Settings:
-
section ?
[ ] month part (1/2/4, default: 2)
-
section object creation and manipulation
[ ] snap objects to other objects
[ ] snap objects to grid
[ ] show grid
[ ] show FieldEditDialog default by click on plant (vs doubleclick/some "info button" click)
[ ] only vertical/horizontal plant sections (disable rotations)
[ ] allow creation variety on-the-fly (without setting in manager)
[ ] seedbed can have name
-
section tips (button open tips)
[ ] show random tip at app start
[ ] show random tips in application
-
[ ] Apply changes only on "save" button (actually saved automatically by change)
__________________________________________________________
### FieldEditDialog:  
[x] Moveable,  
[x] Collapsible  
[ ] Rozdělení na Settings/Info  
#### Settings:  
[ ] name + checkbox display name (in app view)
[ ] název rostliny, - při změně "are you sure? Don't want to use succession plant?" -> I am sure/succession/cancel (+checkbox remember my choice and don't show again [not recommended]). Při "I am sure" YNC dialog jestli měnit spon podle defaultu plodiny
[ ] odruda,  - při změně "are you sure?" -> Yes/cancel (+checkbox remember my choice and don't show again).při potvrzení YNC dialog jestli měnit spon defaultu odrudy
[ ] orientace řádků,
[ ] umístění fieldu od-do (měsíc) (+tlačítko create succesion)
[ ] rozměry fieldu 
[ ] spon(selectbox [from plant, from variety, variety X..., variety Y..., custom] -> input underneath ( two slider and input underneath)). On change in slider/input automatically change selectbox value to custom. Remember custom when change in selectox from custom to another.

#### Basic Info:
[ ] undo - redo button
[ ] Button advanced info (opens big modal with all info [and setting]? about plant)
[ ] vegetační doba
[ ] vypočítaná doba fieldu(sow out+harvest time), 
[ ] vypočítané info o cca množství celkových rostlin, 
[ ] množství potřebného osiva (v gramech)
[ ] orientačně očekávané množství úrody 
[ ] approximate income

[ ] interplant aligner - interplant, target field
[ ] succesion ? Pokud by se vůbec neměnila velikost fieldu, tak možná bude jednodušší... Jen se nastaví od kterého měsíce bude změna a zbytek Fieldu se přenastaví v tomto období na danou rostlinu??
[ ] možnost zadání šířky/výšky fieldu (+ tlačítko pro otočení), stejně tak možnost zadaní množství rostlin v řádku/počtu řádků (+ tlačítko pro otočení), podobně tlačítko pro nastavení velikosti dle jiného fieldu (výběr ze seznamu, kde bude u každého název, plodina, odrůda, měsíce na poli, součadnice)



__________________________________________________________

Záložky
[ ] Design (Base app view)
[ ] plants/parts list
[ ] notes
[ ] planning calendar (weather included)
[ ] settings
[ ] Crop and varieties manager (user can edit settings locally for plants here)
[ ] control garden (IoT)
[ ] shop
__________________________________________________________
V horním menu:
[ ] file edit tools (new, save, save as, undo/redo, copy/cut/paste, delete), 
[ ] calendar (add arrow before and after months [two arrow - one for moving by 1 part, one form jumping between months]), 
[ ] manipulation tools (move, zoom, rectangle select, free select), 
[ ] create? (plant, object, paths, field, shapes, text) - as selection of shapes in ms word - maybe open left menu on select there with pre-filtered [which was selected]
[ ] seedbed creation tools (horizontal split, vertical split, path?, merge),
[ ] layers (plants, object, irrigation, all, lock all), help
[ ] tools (meter)
[ ] group objects
__________________________________________________________
Dole

Advance features

[ ] Vytvoření pole libovolného tvaru->umístění cest/rozdělení na záhony->volba co bude zaseto
[ ] automatic weather checking -> showing tips for user based on it (eg. can transplant seedlings earlier if no frost near last frost date)
__________________________________________________________
Other
[ ] Feature division of different garden part?
__________________________________________________________
Naming:
seedbed => plant section
crop, plant => plant

__________________________________________________________

Spuštění:
klient - start
server - start (nebo watch pro sledování změn a následný rebuild)

cd ./server && npm run watch
cd ./client && npm start