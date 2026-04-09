import { useState, useEffect } from "react";
import axios from "axios";

const useHeaderPlacementTests = () => {
  const [placementTests, setPlacementTests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlacementTests = async () => { 
      try {
        setLoading(true);
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/user/parts/getCategoryPartsWithPlacementTest`
        );

        if (
          response.data.status === "success" &&
          Array.isArray(response.data.message)
        ) {
          const formattedTests = response.data.message.map((item) => ({
            key: `placement-${item.id}`,
            title: item.name,
            link: `/placement-details/${item.id}`,
            image: item.image_url,
            categoryId: item.course_category_id,
          }));

          setPlacementTests(formattedTests);
        } else {
          setPlacementTests([]);
        }
      } catch (error) {
        console.error("Error fetching placement tests:", error);
        setPlacementTests([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPlacementTests();
  }, []);

  return { placementTests, loading };
};

export default useHeaderPlacementTests;
