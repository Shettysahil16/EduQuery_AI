import { tutors } from "../../data/tutors.js";

export const getTutorsController = (req, res) => {
  try {
    // expose ONLY safe fields
    const tutorList = Object.values(tutors).map((tutor) => ({
      tutorId: tutor.tutorId,
      name: tutor.name,
      subject: tutor.subject,
      avatar: tutor.avatar || null,
      url : tutor.url,
      historyName : tutor.historyName,
      description : tutor.myself,
    }));

    res.status(200).json(tutorList);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch tutors", success : false, error : true });
  }
};
