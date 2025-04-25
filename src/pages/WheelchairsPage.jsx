import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ShoppingCart, Info } from "lucide-react";


// Temporary data - Replace with actual data from your database
const wheelchairsData: = [
  {
    ID_FAUTEUIL: 1,
    ID_TYPE: 1,
    ID_UTILISATUER: 1,
    PROPULTION: 1,
    PRIX: 450.00,
    QT_STOCK: 10,
    type: { ID_TYPE: 1, NOM_TYPE: "Manuel" },
    options: [
      { ID_OPTION: 1, NOM_OPTION: "Pliable", TAILLE_OPTION: 0 }
    ]
  },
  {
    ID_FAUTEUIL: 2,
    ID_TYPE: 2,
    ID_UTILISATUER: 1,
    PROPULTION: 2,
    PRIX: 1200.00,
    QT_STOCK: 5,
    type: { ID_TYPE: 2, NOM_TYPE: "Électrique" }
  },
];

const WheelchairsPage = () => {
  const [typeFilter, setTypeFilter] = useState("all");
  const [propulsionFilter, setPropulsionFilter] = useState("all");

  const filteredWheelchairs = wheelchairsData.filter((wheelchair) => {
    const matchesType = typeFilter === "all" || wheelchair.type?.ID_TYPE.toString() === typeFilter;
    const matchesPropulsion = propulsionFilter === "all" || wheelchair.PROPULTION.toString() === propulsionFilter;
    return matchesType && matchesPropulsion;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Catalogue de Fauteuils Roulants</h1>

      <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">Type de fauteuil</label>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Tous les types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous</SelectItem>
                <SelectItem value="1">Manuel</SelectItem>
                <SelectItem value="2">Électrique</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Type de propulsion</label>
            <Select value={propulsionFilter} onValueChange={setPropulsionFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Toutes les propulsions" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous</SelectItem>
                <SelectItem value="1">Manuelle</SelectItem>
                <SelectItem value="2">Électrique</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredWheelchairs.map((wheelchair) => (
          <Card key={wheelchair.ID_FAUTEUIL} className="overflow-hidden">
            <div className="aspect-[4/3] relative">
              <img
                src="https://via.placeholder.com/400x300"
                alt={`Fauteuil ${wheelchair.type?.NOM_TYPE}`}
                className="object-cover w-full h-full"
              />
              {wheelchair.QT_STOCK < 5 && (
                <Badge className="absolute top-2 right-2 bg-red-500">
                  Stock limité: {wheelchair.QT_STOCK}
                </Badge>
              )}
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2">
                Fauteuil {wheelchair.type?.NOM_TYPE}
              </h3>
              <p className="text-xl font-bold text-primary mb-4">
                {wheelchair.PRIX.toFixed(2)} €
              </p>
              <div className="flex gap-2 mt-4">
                <Button className="flex-1" onClick={() => console.log("Added to cart")}>
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Ajouter
                </Button>
                <Button variant="outline" className="flex-1">
                  <Info className="w-4 h-4 mr-2" />
                  Détails
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default WheelchairsPage;
