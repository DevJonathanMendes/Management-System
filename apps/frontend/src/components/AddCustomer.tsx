import { useState } from "react";
import api from "../api/fetch";
import { ICustomer } from "../interfaces/ICustomer";

export default function AddCustomer() {
  const [formData, setFormData] = useState<ICustomer>({
    name: "example",
    email: "example@email.com",
    telephone: "+55 99 99999-9999",
    coordinate_x: "3210",
    coordinate_y: "8590",
  });

  const handleChange = (e: { target: any }) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleClick = async () => {
    const res = await api.post("customers", formData);
    console.log("RES:", res);
  };

  const handleClickRandom = async () => {
    const res = await api.post("customers/fake", formData);
    console.log("RES:", res);
  };

  return (
    <div className="form-control-sm w-25">
      <div className="form-floating mb-3">
        <input
          type="text"
          name="name"
          value={formData.name}
          className="form-control form-control-sm"
          onChange={handleChange}
        />
        <label htmlFor="name">Name</label>
      </div>

      <div className="form-floating mb-3">
        <input
          type="email"
          name="email"
          value={formData.email}
          className="form-control form-control-sm"
          onChange={handleChange}
        />
        <label htmlFor="email">E-mail</label>
      </div>

      <div className="form-floating mb-3">
        <input
          type="tel"
          name="telephone"
          value={formData.telephone}
          className="form-control form-control-sm"
          onChange={handleChange}
        />
        <label htmlFor="telephone">Telephone</label>
      </div>

      <div className="d-flex">
        <div className="form-floating mb-2">
          <input
            type="number"
            name="coordinate_x"
            value={formData.coordinate_x}
            className="form-control form-control-sm"
            onChange={handleChange}
          />
          <label htmlFor="coordinate_x">X</label>
        </div>
        <div className="form-floating mb-2">
          <input
            type="number"
            name="coordinate_y"
            value={formData.coordinate_y}
            className="form-control form-control-sm"
            onChange={handleChange}
          />
          <label htmlFor="coordinate_y">Y</label>
        </div>
      </div>

      <div className="d-flex">
        <button onClick={handleClick} className="btn btn-primary m-1">
          Add
        </button>
        <button onClick={handleClickRandom} className="btn btn-primary m-1">
          Random Add
        </button>
      </div>
    </div>
  );
}
