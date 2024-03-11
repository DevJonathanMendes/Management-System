import { ICustomer } from "../interfaces/ICustomer";

const Tr = (props: { customer: ICustomer }) => {
  const { customer } = props;

  return (
    <tr>
      <th scope="row">{customer.id}</th>
      <td>{customer?.name}</td>
      <td>{customer?.email}</td>
      <td>{customer?.telephone}</td>
      <td>{customer?.coordinate_x}</td>
      <td>{customer?.coordinate_y}</td>
    </tr>
  );
};

export default function Table(props: { customers: ICustomer[] }) {
  return (
    <div className="overflow-table">
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">E-mail</th>
            <th scope="col">Telephone</th>
            <th scope="col">X</th>
            <th scope="col">Y</th>
          </tr>
        </thead>

        <tbody>
          {props.customers.map((customer) => {
            return <Tr key={customer.id} customer={customer} />;
          })}
        </tbody>
      </table>
    </div>
  );
}
