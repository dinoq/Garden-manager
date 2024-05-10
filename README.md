TODO refactor:
[ ] nešly by nějak předělat reducery setLMT a setProjectName do setProject? Jakože nějak pomocí spread operátoru?
[ ] zoom předělat taky na lokální a až po mouseup vložit do reduxu
[ ] změnit "SeedBedsSlice->createNewSeedBedAction->rowsDirection" podle defaultního nastavení! (Aktuálně se tam prostě vkládá ROWDIRECTIONS.LEFT_TO_RIGHT)

__________________________________________________________
### Zákl. Funkcionality
[ ] autosave
__________________________________________________________
### Object creation
[ ] mód pokládání plant pomocí více klikání (uživatel vybere plant a kliká všude kam se mají vkládat jednotlivé rostliny) - nemusí po každé pokládce znovu vybírat rostlinu; mohlo by být realizováno při výběru plants switchem mezi módy - Pozn: jednotlivé rostliny by asi neměli mít FieldEditDialog? Minimálně ne tak podrobný... - možná switch mezi create plant/seedbed
[ ] Možnost kliknutí i táhnutí v seznamu
[ ] při pokládání při kliknutí vložit velikost o jedné rostlině (tak aby se zobrazil move handler i size handler), příp nějaká minimální u malých crop

__________________________________________________________
### Levé menu (pro vytváření objektů)
[ ] hideable (with transition)
__________________________________________________________
### AppView
[ ] přidat kompas + rotace celého view
[ ] Scale přesunovatelné, ale bez funkce zoomu (jestli tak ted funguje)
[ ] metr do tools
[ ] field splitter, joiner


__________________________________________________________
### Nastavení:
[ ] do nastavení přidat rozlišení zda dělit měsíce na 1/2/4 části a defaultně dát 2
[ ] defaultně zobrazovat rozšířený filtr? (Vyhledávání rostlin/objektů) - nastavuje se v Sidebar/showFilter
__________________________________________________________
### FieldEditDialog:  
[x] Moveable,  
[x] Collapsible  
[ ] Rozdělení na Settings/Info  
Settings:  
[ ] název rostliny, - při změně YNC dialog jestli měnit spon podle defaultu plodiny
[ ] odruda,  - při změně YNC dialog jestli měnit spon defaultu odrudy
[ ] orientace řádků,
[ ] umístění fieldu od-do (měsíc) (+tlačítko create succesion)
[ ] rozměry fieldu 
[ ] spon(radiobutton basic X advanced) (poslední volba custom - zobrazí dále pole), 

#### Info:
[ ] vegetační doba
[ ] vypočítaná doba fieldu(sow out+harvest time), 
[ ] vypočítané info o cca množství celkových rostlin, 
[ ] množství potřebného osiva (v gramech)
[ ] orientačně očekávané množství úrody 

[ ] interplant aligner - interplant, target field
[ ] succesion ? Pokud by se vůbec neměnila velikost fieldu, tak možná bude jednodušší... Jen se nastaví od kterého měsíce bude změna a zbytek Fieldu se přenastaví v tomto období na danou rostlinu??
[ ] možnost zadání šířky/výšky fieldu (+ tlačítko pro otočení), stejně tak možnost zadaní množství rostlin v řádku/počtu řádků (+ tlačítko pro otočení), podobně tlačítko pro nastavení velikosti dle jiného fieldu (výběr ze seznamu, kde bude u každého název, plodina, odrůda, měsíce na poli, součadnice)



__________________________________________________________

Záložky
[ ] Design, Crop and varieties manager, sow times, notes, plants/calendar, settings, control garden (IoT), shop
__________________________________________________________
V horním menu:
[ ] editační tlačítka (nový, uložit, uložit jako, undo/redo, copy/cut/paste, delete), 
[ ] kalendář, manipulační tlačítka (move, zoom, rectangle select, free select), create (plant, object, paths, field, shapes, text) - jako výběr obrazců v ms word, seedbed creation tools (horizontal split, vertical split, path?, merge),layers (plants, object, irrigation, all, lock all), help
__________________________________________________________
Dole

Advance features

[ ] Vytvoření pole libovolného tvaru->umístění cest/rozdělení na záhony->volba co bude zaseto
__________________________________________________________

Spuštění:
klient - start
server - start (nebo watch pro sledování změn a následný rebuild)