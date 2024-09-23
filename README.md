# szfm-kicsi
A "Nyíregyháza" csapat kis projektje

Óra ideje: hétfő, 12:00

A projekt témája: todo webapp

Vízió: todo webapp CRUD műveletekkel.

Tagok:
- Tóth Áron Pál
- Huzina Patrik
- Horváth Alex Kristóf
- Margitai Balázs

<div hidden>
```
@startuml
left to right direction
skinparam packageStyle rectangle
actor "Felhasználó" as a1
rectangle "TODO" {
  a1 --> (Kártya létrehozása)
  a1 --> (Kártya szerkesztése)
  a1 --> (Kártya mozgatása)
  a1 --> (Kártya kidobása)
  a1 --> (Lomtár űrítése) 
  (Kártya kidobása) ..>  (Lomtárba helyezés) : <<include>>
  (Lomtár űrítése) ..> (Végleges törlés) : <<include>>
}
@enduml
```
</div>

![](firstDiagram.svg)

