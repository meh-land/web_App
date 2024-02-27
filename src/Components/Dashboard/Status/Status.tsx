import { FC } from "react";
import Card from "../Card/Card";
import "./Status.css";

const Status: FC = () => {
  return (
    <Card
      Title="Status"
      Content={
        <div className="table-responsive">
          <table className="table table-borderless mb-0 table-striped align-middle">
            <thead>
              <tr>
                <th scope="col">X</th>
                <th scope="col">Y</th>
                <th scope="col">θ</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>x</td>
                <td>y</td>
                <td>θ</td>
              </tr>
              <tr>
                <td>x</td>
                <td>y</td>
                <td>θ</td>
              </tr>
              <tr>
                <td>x</td>
                <td>y</td>
                <td>θ</td>
              </tr>
            </tbody>
          </table>
        </div>
      }
    />
  );
};

export default Status;
