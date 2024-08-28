
export const customStyles = {
    headCells: {
      style: {
        fontSize: '1.125rem', // Tailwind's text-lg
        fontWeight: '700', // Tailwind's font-semibold
      },
    },
    cells: {
      style: {
        fontSize: '1.125rem', // Tailwind's text-lg
      },
    },
  };
  
  
export  const columns = [
      {
          name: 'ID',
          selector: row => row.id,
          sortable: true,
          width: '80px'
      },
      {
          name: 'Name',
          selector: row => row.name,
      sortable: true,
      },
      {
          name: 'Price',
          selector: row => row.price, // Assuming you meant 'price' instead of 'year'
          sortable: true,
      },
      {
          name: 'Category',
          selector: row => row.category, // Assuming you meant 'category' instead of 'year'
      sortable: true,
      },
      {
          name: 'Description',
          selector: row => row.description, // Assuming you meant 'description' instead of 'year'
          sortable: true,
      },
     
  ];