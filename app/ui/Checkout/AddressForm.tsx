import { useState, useEffect } from "react";
import CustomInput from "@/app/ui/CustomInput";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

export default function AddressForm({
  errors,
  setErrors,
  country,
  state,
  cities,
  formData,
  setFormData,
  user,
}: any) {
  const [stateSearch, setStateSearch] = useState("");
  const [citySearch, setCitySearch] = useState("");

  useEffect(() => {
    if (user) {
      setFormData({
        ...formData,
        fullName: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        address: user.address || "",
        country_id: user.country_id || "",
        state_id: user.state_id || "",
        city_id: user.city_id || "",
        additionalNote: user.additionalNote || "",
      });
    }
  }, [user]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors?.[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };
  // console.log(country)

  const handleSelectChange = (value: string) => {
    const existCountry = country.find((item: any) => item.id === value);
    if (existCountry) {
      setFormData({
        ...formData,
        country_id: value,
        country_name: existCountry.name,
      });
      // Clear error when user selects a country
      if (errors?.country_id) {
        setErrors({ ...errors, country_id: "" });
      }
    }
  };
  const handleSelectState = (value: string) => {
    const existState = state.find((item: any) => item.id === value);
    if (existState) {
      setFormData({
        ...formData,
        state_id: value,
        state_name: existState.name,
      });
      if (errors?.state_id) {
        setErrors({ ...errors, state_id: "" });
      }
    }
  };

  const handleSelectCities = (value: string) => {
    const existCities = cities.find((item: any) => item.id === value);
    if (existCities) {
      setFormData({
        ...formData,
        city_id: value,
        city_name: existCities.name,
      });
      if (errors?.city_id) {
        setErrors({ ...errors, city_id: "" });
      }
    }
  };
  return (
    <>
      {/* Country/Region */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Country/Region</label>
        <Select value={formData?.country_id} onValueChange={handleSelectChange}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a country" />
          </SelectTrigger>
          <SelectContent>
            {country.map((item: any) => (
              <SelectItem key={item.id} value={item.id}>
                {item.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors?.country_id && (
          <p className="text-red-500 text-sm mt-1">{errors.country_id}</p>
        )}
      </div>

      {/* Full Name */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Full Name</label>
        <CustomInput
          name="fullName"
          type="text"
          placeholder="ex *"
          className="w-full"
          value={formData.fullName}
          onChange={handleInputChange}
        />
        {errors?.fullName && (
          <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
        )}
      </div>

      {/* E-Mail */}
      <div className="mb-4 hidden">
        <label className="block text-sm font-medium mb-2">E-Mail</label>
        <CustomInput
          name="email"
          type="email"
          placeholder="example@gmail.com *"
          className="w-full"
          value={formData.email}
          onChange={handleInputChange}
        />
        {errors?.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email}</p>
        )}
      </div>

      {/* Phone Number */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Phone Number</label>
        <CustomInput
          name="phone"
          type="tel"
          placeholder="Phone Number"
          className="w-full"
          value={formData.phone}
          onChange={handleInputChange}
        />
        {errors?.phone && (
          <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
        )}
      </div>

      {/* Postal code */}
      <div className="mb-4 hidden">
        <label className="block text-sm font-medium mb-2">Postal code</label>
        <CustomInput
          name="postal_code"
          type="tel"
          placeholder="1212"
          className="w-full"
          value={formData.postal_code}
          onChange={handleInputChange}
        />
        {errors?.postal_code && (
          <p className="text-red-500 text-sm mt-1">{errors.postal_code}</p>
        )}
      </div>

      {/* State (District) */}
      {state && state.length > 1 && (
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">
            Select District
          </label>
          <Select value={formData?.state_id} onValueChange={handleSelectState}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select District" />
            </SelectTrigger>
            <SelectContent>
              <div className="p-2">
                <input
                  type="text"
                  placeholder="Search District..."
                  className="w-full px-2 py-1 border border-gray-300 rounded mb-2"
                  value={stateSearch}
                  onChange={(e) => setStateSearch(e.target.value)}
                />
              </div>
              {state
                .filter((item: any) =>
                  item.name.toLowerCase().includes(stateSearch.toLowerCase())
                )
                .map((item: any) => (
                  <SelectItem key={item.id} value={item.id}>
                    {item.name}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
          {errors?.state_id && (
            <p className="text-red-500 text-sm mt-1">{errors.state_id}</p>
          )}
        </div>
      )}

      {/* City (Area/Thana) */}
      {cities.length > 0 && (
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">
            Select Area/Thana
          </label>
          <Select value={formData?.city_id} onValueChange={handleSelectCities}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Area/Thana" />
            </SelectTrigger>
            <SelectContent>
              <div className="p-2">
                <input
                  type="text"
                  placeholder="Search Area/Thana..."
                  className="w-full px-2 py-1 border border-gray-300 rounded mb-2"
                  value={citySearch}
                  onChange={(e) => setCitySearch(e.target.value)}
                />
              </div>
              {cities
                .filter((item: any) =>
                  item.name.toLowerCase().includes(citySearch.toLowerCase())
                )
                .map((item: any) => (
                  <SelectItem key={item.id} value={item.id}>
                    {item.name}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
          {errors?.city_id && (
            <p className="text-red-500 text-sm mt-1">{errors.city_id}</p>
          )}
        </div>
      )}

      {/* Address */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Address</label>
        <Textarea
          name="address"
          placeholder="Address"
          className="w-full"
          value={formData.address}
          onChange={handleInputChange}
        />
        {errors?.address && (
          <p className="text-red-500 text-sm mt-1">{errors.address}</p>
        )}
      </div>

      {/* Additional Note */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Note</label>
        <Textarea
          name="additionalNote"
          placeholder="Any additional notes (optional)"
          className="w-full"
          value={formData.additionalNote}
          onChange={handleInputChange}
        />
      </div>
    </>
  );
}
