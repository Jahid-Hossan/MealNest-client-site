const RequestedMealTable = ({ requestedMeal, reviews }) => {
    return (
        <tbody>
            <tr className="activehover">
                <th>{requestedMeal.title}</th>
                <td>{requestedMeal.likes}</td>
                <td>Desktop Support Technician</td>
                <td>Purple</td>
            </tr>
        </tbody>
    );
};

export default RequestedMealTable;