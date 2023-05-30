TODO:
- nešly by nějak předělat reducery setLMT a setProjectName do setProject? Jakože nějak pomocí spread operátoru?
-zoom předělat taky na lokální a až po mouseup vložit do reduxu
-Scale přesunovatelné, ale bez funkce zoomu (jestli tak ted funguje)
-do nastavení přidat rozlišení zda dělit měsíce na 1/2/4 části a defaultně dát 2
- Ke každému fieldu budou pod sebou fieldEdity - rozevíratelné dialogy (něco jako ve Fusion360 při např. extrude). Přesunovatelné.
- Vkládání rostlin i "táhnutím" (ne jen kliknutím) ze seznamu
- změnit "SeedBedsSlice->createNewSeedBedAction->rowsDirection" podle defaultního nastavení! (Aktuálně se tam prostě vkládá ROWDIRECTIONS.LEFT_TO_RIGHT)
- mód pokládání plant pomocí více klikání (uživatel vybere plant a kliká všude kam se mají vkládat jednotlivé rostliny) - nemusí po každé pokládce znovu vybírat rostlinu; mohlo by být realizováno při výběru plants switchem mezi módy - Pozn: jednotlivé rostliny by asi neměli mít FieldEditDialog? Minimálně ne tak podrobný...
- autosave


FieldEditDialog:
Rozdělení na basic/advanced (Uvnitř každého sekce?)
Basic:
Plant Info - název fieldu, volba rostliny, odruda, radiobutton defaultní/manuální spon (a kdyžtak volba), orientace řádků,umístění fieldu od-do (měsíc)/sow out+harvest time=>vypočítaná doba fieldu?, vypočítané info o cca množství celkových rostlin, množství potřebného osiva (v gramech), příp. orientačně očekávané množství úrody 
interplant aligner - interplant, target field
succesion ? Pokud by se vůbec neměnila velikost fieldu, tak možná bude jednodušší... Jen se nastaví od kterého měsíce bude změna a zbytek Fieldu se přenastaví v tomto období na danou rostlinu??
možnost zadání šířky/výšky fieldu (+ tlačítko pro otočení), stejně tak možnost zadaní množství rostlin v řádku/počtu řádků (+ tlačítko pro otočení), podobně tlačítko pro nastavení velikosti dle jiného fieldu (výběr ze seznamu, kde bude u každého název, plodina, odrůda, měsíce na poli, součadnice)


Do uživatelského nastavení:
defaultně zobrazovat rozšířený filtr? (Vyhledávání rostlin/objektů) - nastavuje se v Sidebar/showFilter



Záložky
Design, varieties manager, sow times, notes, settings
_________________________
V horním menu:
editační tlačítka (nový, uložit, uložit jako, undo/redo, copy/cut/paste, delete), kalendář, manipulační tlačítka (move, zoom, rectangle select, free select), create (plant, object, paths, field, shapes, text) - jako výběr obrazců v ms word, seedbed creation tools (horizontal split, vertical split, path?, merge),layers (plants, object, all, lock all), help
_________________________
Dole


-----------------
Vytvoření pole libovolného tvaru->umístění cest/rozdělení na záhony->volba co bude zaseto
-----------

Spuštění:
klient - start
server - start (nebo watch pro sledování změn a následný rebuild)