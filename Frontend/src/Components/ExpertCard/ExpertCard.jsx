import React, { useEffect, useState } from "react";
import Card from "./Card";
import { experts } from "../../constants/experts";
import summaryApi from "../../common";

const ExpertCard = () => {
  const [loading, setLoading] = useState(false);
  const [tutors, setTutors] = useState([]);
  const filteredExperts = experts.filter(
    (expert) => expert.tutorId !== "general",
  );

  const fetchExperts = async () => {
    try {
      setLoading(true);
      const response = await fetch(summaryApi.getTutors.url, {
        method: summaryApi.getTutors.method,
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
      });

      const data = await response.json();
      
      setTutors(data);
      setLoading(false);
    } catch (error) {
      console.log("error in fetching tutors", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExperts();
  }, []);

  const mergedExperts = filteredExperts.map((expert) => {
    const matchedTutor = tutors.find((tutor) => tutor.url === expert.expertUrl);

    return {
      ...expert,
      ...matchedTutor, 
    };
  });

  //console.log("mergedExperts", mergedExperts);
  
  //const card = Array.from({length : 10});

  return (
    <div className="px-2">
      <div className="text-5xl font-medium">Experts</div>
      <hr className="h-0.75 bg-Primary mt-4 rounded-full" />
      <div className="h-[calc(100vh-150px)] overflow-y-auto pr-2 scrollbar-custom">
        <div className="min-h-[calc(100vh-150px)] py-4 pl-1 flex flex-col gap-4">
          {mergedExperts.map((expert, index) => {
            return (
              <Card
                key={index}
                expert={expert}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ExpertCard;
