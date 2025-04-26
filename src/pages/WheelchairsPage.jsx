import React, { useState, useMemo, useEffect } from "react";
import { ShoppingCart, Home, Heart, X } from "lucide-react";
import { useToast } from '../contexts/ToastContext';
import Button from '../components/Button';

import { wheelchairsData, wheelchairCategories, wheelchairFeatures } from "../data/wheelchaires.jsx";

const WheelchairsPage = () => {
  const [filters, setFilters] = useState({
    type: "all",
    propulsion: "all",
    priceRange: "all",
    inStock: false,
    foldable: false,
    searchQuery: "",
  });
  
  const [activeFiltersCount, setActiveFiltersCount] = useState(0);
  const [sortOption, setSortOption] = useState("mostPopular");
  const [favorites, setFavorites] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    let count = 0;
    if (filters.type !== "all") count++;
    if (filters.propulsion !== "all") count++;
    if (filters.priceRange !== "all") count++;
    if (filters.inStock) count++;
    if (filters.foldable) count++;
    if (filters.searchQuery) count++;
    setActiveFiltersCount(count);
  }, [filters]);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const filteredWheelchairs = useMemo(() => {
    return wheelchairsData
      .filter((wheelchair) => {
        if (filters.type !== "all" && wheelchair.type?.ID_TYPE.toString() !== filters.type) return false;
        if (filters.propulsion !== "all" && wheelchair.PROPULTION.toString() !== filters.propulsion) return false;
        if (filters.priceRange !== "all") {
          const price = wheelchair.PRIX;
          if (filters.priceRange === "under500" && price >= 500) return false;
          if (filters.priceRange === "500to1000" && (price < 500 || price > 1000)) return false;
          if (filters.priceRange === "over1000" && price <= 1000) return false;
        }
        if (filters.inStock && wheelchair.QT_STOCK <= 0) return false;
        if (filters.foldable && !wheelchair.options?.some(opt => opt.NOM_OPTION === "Pliable")) return false;
        if (filters.searchQuery) {
          const query = filters.searchQuery.toLowerCase();
          const type = wheelchair.type?.NOM_TYPE?.toLowerCase() || "";
          const description = wheelchair.DESCRIPTION?.toLowerCase() || "";
          if (!type.includes(query) && !description.includes(query)) return false;
        }
        return true;
      })
      .sort((a, b) => {
        switch (sortOption) {
          case "priceLow":
            return a.PRIX - b.PRIX;
          case "priceHigh":
            return b.PRIX - a.PRIX;
          case "stockLow":
            return a.QT_STOCK - b.QT_STOCK;
          case "stockHigh":
            return b.QT_STOCK - a.QT_STOCK;
          case "nameAsc":
            return (a.type?.NOM_TYPE || "").localeCompare(b.type?.NOM_TYPE || "");
          case "nameDesc":
            return (b.type?.NOM_TYPE || "").localeCompare(a.type?.NOM_TYPE || "");
          default:
            return 0;
        }
      });
  }, [filters, sortOption]);

  const handleFilterChange = (name, value) => {
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleAddToCart = (wheelchair) => {
    toast({
      title: "Product added to cart",
      description: `${wheelchair.type?.NOM_TYPE} has been added to your cart`,
      duration: 2000,
    });
  };

  const toggleFavorite = (id) => {
    setFavorites(prev =>
      prev.includes(id)
        ? prev.filter(itemId => itemId !== id)
        : [...prev, id]
    );
    toast({
      title: favorites.includes(id) ? "Removed from favorites" : "Added to favorites",
      duration: 2000,
    });
  };

  const removeFilter = (filterName) => {
    if (filterName === "type" || filterName === "propulsion" || filterName === "priceRange") {
      handleFilterChange(filterName, "all");
    } else if (filterName === "searchQuery") {
      handleFilterChange(filterName, "");
    } else {
      handleFilterChange(filterName, false);
    }
  };

  const getTagsFromFilters = () => {
    const tags = [];
    if (filters.type !== "all") {
      const typeName = wheelchairCategories.find(cat => cat.id.toString() === filters.type)?.name || filters.type;
      tags.push({ name: "type", label: typeName });
    }
    if (filters.propulsion !== "all") {
      const propulsionLabel = filters.propulsion === "1" ? "Manual" : filters.propulsion === "2" ? "Electric" : "Hybrid";
      tags.push({ name: "propulsion", label: propulsionLabel });
    }
    if (filters.priceRange !== "all") {
      const priceLabel = filters.priceRange === "under500" ? "< 500€" : filters.priceRange === "500to1000" ? "500€ - 1000€" : "> 1000€";
      tags.push({ name: "priceRange", label: priceLabel });
    }
    if (filters.inStock) tags.push({ name: "inStock", label: "In Stock" });
    if (filters.foldable) tags.push({ name: "foldable", label: "Foldable" });
    if (filters.searchQuery) tags.push({ name: "searchQuery", label: `"${filters.searchQuery}"` });
    return tags;
  };

  const getProductBadge = (wheelchair) => {
    if (wheelchair.NEW) return { text: "NEW", class: "bg-indigo-100 text-indigo-700" };
    if (wheelchair.BESTSELLER) return { text: "BEST SELLER", class: "bg-indigo-100 text-indigo-700" };
    if (wheelchair.PROMO) return { text: "HOT PROMO", class: "bg-pink-100 text-pink-700" };
    return null;
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Left Sidebar */}
      <aside className="w-64 min-w-64 h-screen bg-white border-r sticky top-0 p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Categories</h2>
        
        {/* Categories */}
        <div className="space-y-2">
          {wheelchairCategories.map(category => (
            <button
              key={category.id}
              className={`w-full text-left py-2 px-3 rounded-lg text-sm flex justify-between items-center ${
                category.id === filters.type
                  ? 'bg-purple-50 text-purple-600 font-medium'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <span>{category.name}</span>
              <span className="text-xs text-gray-400">({category.count})</span>
            </button>
          ))}
        </div>

        <div className="mt-8">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Filters</h2>
          <div className="space-y-6">
            {/* Features */}
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-4">Features</h3>
              <div className="space-y-3">
                {wheelchairFeatures.map(feature => (
                  <label key={feature.id} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        checked={filters[feature.id] || false}
                        onChange={(e) => handleFilterChange(feature.id, e.target.checked)}
                        className="w-4 h-4 text-purple-600 rounded border-gray-300 focus:ring-purple-500"
                      />
                      <span className="ml-3 text-sm text-gray-600">{feature.name}</span>
                    </div>
                    <span className="text-xs text-gray-400">({feature.count})</span>
                  </label>
                ))}
              </div>
            </div>
            
            {/* Price Range */}
            <div className="border-b pb-6">
              <h3 className="text-sm font-medium text-gray-900 mb-4">Price Range</h3>
              <div className="space-y-3">
                {[
                  { label: 'Under €500', value: 'under500' },
                  { label: '€500 - €1000', value: '500to1000' },
                  { label: 'Over €1000', value: 'over1000' },
                ].map(option => (
                  <label key={option.value} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={filters.priceRange === option.value}
                      onChange={() => handleFilterChange('priceRange', option.value)}
                      className="w-4 h-4 text-purple-600 rounded border-gray-300 focus:ring-purple-500"
                    />
                    <span className="ml-3 text-sm text-gray-600">{option.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 py-8 px-12">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Wheelchairs</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-500">Sort by:</span>
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="border rounded-md px-3 py-1.5 text-sm"
            >
              <option value="mostPopular">Most Popular</option>
              <option value="priceLow">Price: Low to High</option>
              <option value="priceHigh">Price: High to Low</option>
              <option value="nameAsc">Name: A-Z</option>
              <option value="nameDesc">Name: Z-A</option>
            </select>
          </div>
        </div>

        {/* Active Filters */}
        <div className="flex gap-2 mb-6">
          {getTagsFromFilters().map(tag => (
            <div key={tag.name} className="bg-gray-100 px-3 py-1 rounded-full text-sm flex items-center">
              {tag.label}
              <button onClick={() => removeFilter(tag.name)} className="ml-2">
                <X size={14} className="text-gray-500" />
              </button>
            </div>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading
            ? [...Array(6)].map((_, i) => (
                <div key={i} className="bg-gray-200 animate-pulse h-96 rounded-xl shadow-lg" />
              ))
            : filteredWheelchairs.map((wheelchair) => {
                const badge = getProductBadge(wheelchair);
                return (
                  <div
                    key={wheelchair.ID_FAUT}
                    className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col"
                  >
                    <div className="relative h-64 bg-gray-100">
                      <img
                        src={wheelchair.image || "/placeholder.svg"}
                        alt={wheelchair.type?.NOM_TYPE}
                        className="w-full h-full object-cover"
                      />
                      {badge && (
                        <div className={`absolute top-4 left-4 px-4 py-2 rounded-full text-sm font-semibold ${badge.class}`}>
                          {badge.text}
                        </div>
                      )}
                      <div className="absolute bottom-4 left-4 bg-white px-2 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                        <span>★</span>
                        <span>{wheelchair.rating}</span>
                        <span className="text-gray-500">({wheelchair.reviews})</span>
                      </div>
                      <button
                        onClick={() => toggleFavorite(wheelchair.ID_FAUT)}
                        className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-shadow duration-300"
                      >
                        <Heart
                          size={20}
                          className={favorites.includes(wheelchair.ID_FAUT)
                            ? "fill-red-500 text-red-500"
                            : "text-gray-400 hover:text-gray-600"}
                        />
                      </button>
                    </div>
                    <div className="p-6 flex flex-col flex-grow">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{wheelchair.type?.NOM_TYPE}</h3>
                      <p className="text-gray-600 flex-grow line-clamp-2">
                        {wheelchair.DESCRIPTION || "No description available."}
                      </p>
                      <div className="mt-6 flex items-center justify-between">
                        <div className="flex flex-col">
                          <span className="text-sm text-gray-500">Price</span>
                          <span className="text-2xl font-bold text-gray-900">€{wheelchair.PRIX}</span>
                        </div>
                        <Button
                          size="sm"
                          onClick={() => handleAddToCart(wheelchair)}
                          className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-colors duration-300"
                        >
                          <ShoppingCart size={20} />
                          <span>Add to Cart</span>
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })}
        </div>

        {/* No Results */}
        {!isLoading && filteredWheelchairs.length === 0 && (
          <div className="text-center text-gray-500 mt-12">
            No wheelchairs match your filter criteria.
          </div>
        )}
      </main>
    </div>
  );
};

export default WheelchairsPage;
