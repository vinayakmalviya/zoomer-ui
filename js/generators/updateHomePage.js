import generateActiveRoom from "./activeRoomGenerator";
import generateAvailableRoom from "./availableRoomGenerator";

const updateHomePage = (activeRooms, availableRooms, occupancies) => {
  const activeRoomsSection = document.getElementById("active-rooms");
  const availableRoomsSection = document.getElementById("available-rooms");

  // Generating active rooms
  const activeRoomsFragment = document.createDocumentFragment();

  activeRooms.forEach((room) => {
    const roomOccupancyDetails = occupancies.filter((o) => o.id === room.id)[0];

    activeRoomsFragment.appendChild(
      generateActiveRoom(
        room.id,
        room.name,
        room.room_id,
        room.capacity,
        room.time_limit,
        room.link,
        roomOccupancyDetails.occupied_until,
        roomOccupancyDetails.meetingTitle
      )
    );
  });

  // Generating available rooms
  const availableRoomsFragment = document.createDocumentFragment();

  availableRooms.forEach((room) => {
    availableRoomsFragment.appendChild(
      generateAvailableRoom(
        room.id,
        room.name,
        room.room_id,
        room.capacity,
        room.time_limit,
        room.link
      )
    );
  });

  activeRoomsSection.replaceChildren(activeRoomsFragment);
  availableRoomsSection.replaceChildren(availableRoomsFragment);
};

export default updateHomePage;
