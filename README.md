TODO:
-AppLayout komponentu
-zoom předělat taky na lokální a až po mouseup vložit do reduxu
-Scale přesunovatelné, ale bez funkce zoomu (jestli tak ted funguje)
-do nastavení přidat rozlišení zda dělit měsíce na 1/2/4 části a defaultně dát 2
- Ke každému fieldu budou pod sebou fieldEdity - rozevíratelné dialogy (něco jako ve Fusion360 při např. extrude). Přesunovatelné.


FieldEdity:
Plant Info - název fieldu, volba rostliny, odruda, radiobutton defaultní/manuální spon (a kdyžtak volba),umístění fieldu od-do (měsíc), vypočítané info o cca množství celkových rostlin, množství potřebného osiva (v gramech), příp. orientačně očekávané množství úrody 
interplant aligner - interplant, target field
succesion ? Pokud by se vůbec neměnila velikost fieldu, tak možná bude jednodušší... Jen se nastaví od kterého měsíce bude změna a zbytek Fieldu se přenastaví v tomto období na danou rostlinu??


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