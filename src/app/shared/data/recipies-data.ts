import { I_Recipe } from "../Models/I_Recipes";
import { Timestamp } from '@angular/fire/firestore';

export const RECIPIES: I_Recipe[] = [
  {
    id:  '1',
    title: 'Low Carb Käsekuchen',
    description: 'Dieser Käsekuchen hat wenig Kohlenhydrate und keinen Boden. Dafür viel Eiweiß und noch mehr Geschmack.',
    coverUrl: 'sh_Sea-Wave_506440768_Cheesecake_Low-carb.jpg.webp',
    CookingTime: 30,
    PreparationTime: 15,
    DegreeOfDifficulty: 1,
    MuscleBuildingFactor: 2,
    WeightLossFactor: 3,
    NutritionalValue: {
      calories: 42,
      portien: 3.91,
      carbohydrates: 5.32,
      fats: 1.08,
    },
    creatAtTmp: Timestamp.fromDate(new Date()),
    updatAtmp: Timestamp.fromDate(new Date()),
    categories: ['dessert'],
    steps: [
      'Backofen auf 175°C (Ober- und Unterhitze) vorheizen.',
      'Eier trennen und das Eiweiß mit einer Prise Salz steif schlagen.',
      'In einer zweiten Schüssel Quark, Frischkäse, Eigelb, Vanillepulver und Xylit cremig rühren. Eischnee vorsichtig unterheben.',
      'Eine Springform (26cm) mit Backpapier auslegen und die Massen hineingeben. Die gefrorenen Beeren darauf verteilen.',
      'Auf mittlerer Schiene 25 - 30 Minuten backen. Auskühlen lassen und servieren.'
    ],
    materials: ['schüssel', 'springform', 'backpapier'],

  },
  {
    id: '2',
    title: 'Leichter Kartoffelsalat mit Joghurtdressing',
    description: 'Verpasse deinem Kartoffelsalat ein sommerliches Upgrade: Mit einer extra Portion Protein, mehr Volumen dank Eisbergsalat-Basis und einem leichten Joghurt-Senf-Dressing sparst du jede Menge Kalorien ',
    coverUrl: '1689591284896-64b51df4ef76c1000808cf91.webp',
    CookingTime: 20,
    PreparationTime: 20,
    DegreeOfDifficulty: 1,
    MuscleBuildingFactor: 1,
    WeightLossFactor: 3,
    NutritionalValue: {
      calories: 239,
      portien: 11.95,
      carbohydrates: 32.43,
      fats: 6.61,
    },
    creatAtTmp: Timestamp.fromDate(new Date()),
    updatAtmp: Timestamp.fromDate(new Date()),
    categories: ['salate', 'hauptgericht'],
    steps: [
      'Festkochende Kartoffeln wählen und kleine Exemplare aussuchen, am besten mit heller Schale die du nicht schälen musst, wie zum Beispiel bei „Drillingen“. Das spart Zeit und die Kartoffeln zerfallen auch nicht so schnell. Kartoffeln in ausreichend Salzwasser rund 2m Minuten kochen, bis sie gar sind. Du kannst auch gut abgekühlte Pellkartoffeln (also mit Schale) verwenden.',
      'Eier separat hart kochen. Im Anschluss abschrecken, pellen, vierteln.',
      'Salat (1/2 großen Kopf oder 1 kleinen ganzen Kopf für 4 Portionen) waschen und in grobe Stücke schneiden. Gurke waschen und in dünne Halbringe schnibbeln. Zwiebel abziehen und ebenfalls in Halbringe schneiden. Gewürzgurken in Scheiben.',
      'Gegarte Kartoffeln vierteln und zusammen mit Salat, Gurke und Zwiebeln in eine Schüssel geben.',
      'Dressing aus den genannten Zutaten plus einem Schuss Gurkenwasser der Cornichons zusammenrühren, mit Salz und Pfeffer abschmecken. Zum Salat geben, untermengen, abkühlen und durchziehen lassen. Mit Kräutern nach Wahl (wir nehmen Schnittlauch) und gekochten Eier-Stückchen (Eier vierteln) toppen.'
    ],
    materials: [],
  },
  {
    id: '3',
    title: 'Gelbes Thai-Curry mit Tofu',
    description: 'Currys sind super fix in der Zubereitung und schmecken einfach immer. Das Gemüse lässt sich beliebig variieren und wer noch ein paar Carbs möchte, kocht einfach Reis dazu. ',
    coverUrl: '1660588135750-62fa90677b3b4600074f2d7e',
    CookingTime: 15,
    PreparationTime: 15,
    DegreeOfDifficulty: 1,
    MuscleBuildingFactor: 0,
    WeightLossFactor: 2,
    NutritionalValue: {
      calories: 443,
      portien: 15.76,
      carbohydrates: 14.81,
      fats: 32.94
    },
    creatAtTmp: Timestamp.fromDate(new Date()),
    updatAtmp: Timestamp.fromDate(new Date()),
    categories: ['hauptgericht', 'abendessen', 'mittagessen', 'vegan'],
    steps: [
      'Tofu so gut es geht mit einem Handtuch oder ein paar Blättern Küchenrolle auspressen, dann würfeln sowie salzen und pfeffern. ',
      'Zucchini in Scheiben (oder gern auch mundgerechte Würfel) schneiden. Paprika entkernen und grob würfeln. Karotte schälen und in Scheiben schneiden. Spinat waschen, lange Stile entfernen. Zwiebel, Knoblauch und Ingwer schälen und fein hacken. ',
      'Kokosöl in einer großen Pfanne erhitzen und Tofu von allen Seiten anbraten. Aus der Pfanne nehmen und beiseite stellen. ',
      'Zwiebel, Knoblauch und Ingwer in die gleiche Pfanne geben und kurz braten. Von der Kokosmilch 1 TL des festeren Teils, der sich oben absetzt mit der (gelben) Currypaste zusammen mit dazu geben und kurz anbraten. Nach 3 Minuten die restliche Kokosmilch sowie die Sojasoße hinzugießen. Mit Curry würzen. Mit einem Schuss Gemüsebrühe eventuell etwas auffüllen, falls dein Gemüse nicht gut genug bedeckt ist. ',
      'Das Gemüse (bis auf den Spinat) unterheben und etwa 10 Minuten köcheln lassen, sodass es weich ist, aber ruhig noch etwas Biss hat. Dann erst den Spinat unterheben, der sofort in sich zusammenfallen wird. ',
      'Tofu nun ganz am Ende dazu geben und Curry mit Sojasoße und Limette abschmecken. Optional mit Sambal Oelek würzen. '
    ],
    materials: ['pfanne'],
  },
  {
  id: '4',
    title: 'Leckere Magerquark-Pancakes',
    description: 'Diese fluffigen Pancakes aus Quark-Teig versüßen uns den Morgen. Am besten schmeckt das süße Frühstücks-Rezept mit frischen Früchten, Ahornsirup oder Nussmus.',
    coverUrl: 'sh_Yulia-Davidovich_342041690_Pancakes_800x462.jpg.webp',
    CookingTime: 15,
    PreparationTime: 5,
    DegreeOfDifficulty: 1,
    MuscleBuildingFactor: 1,
    WeightLossFactor: 2,
    NutritionalValue: {
      calories: 499,
      portien: 34.27,
      carbohydrates: 50.50,
      fats: 16.69
    },
    creatAtTmp: Timestamp.fromDate(new Date()),
    updatAtmp: Timestamp.fromDate(new Date()),
    categories: ['frühstück'],
    steps: [
      'Magerquark, Mehl, Milch, Eier, Salz und Honig miteinander verrühren.',
      'Öl (nicht alles auf einmal!) in eine beschichtete Pfanne geben und heiß werden lassen.',
      'Teig portionsweise in der Pfanne zu kleinen goldbraunen Pancakes ausbacken.',
      'Mit Heidelbeeren (oder anderen Früchten) nach Wahl toppen.'
    ],
    materials: ['pfanne'],
  }
]
