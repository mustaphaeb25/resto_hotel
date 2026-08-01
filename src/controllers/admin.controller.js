import prisma from '../config/database.js';

export async function dashboard(req, res) {
  const [
    totalRooms,
    totalMenuItems,
    totalExperiences,
    totalGallery,
    totalUsers,
    totalInquiries,
    unreadInquiries,
    totalSubscribers,
    roomReservations,
    diningReservations,
    experienceBookings,
    recentInquiries,
  ] = await Promise.all([
    prisma.room.count(),
    prisma.menuItem.count(),
    prisma.experience.count(),
    prisma.galleryItem.count(),
    prisma.user.count(),
    prisma.contactInquiry.count(),
    prisma.contactInquiry.count({ where: { isRead: false } }),
    prisma.newsletterSubscriber.count({ where: { subscribed: true } }),
    prisma.roomReservation.findMany({ orderBy: { createdAt: 'desc' }, take: 5, include: { room: true, user: { select: { name: true, email: true } } } }),
    prisma.diningReservation.findMany({ orderBy: { createdAt: 'desc' }, take: 5 }),
    prisma.experienceBooking.findMany({ orderBy: { createdAt: 'desc' }, take: 5, include: { experience: true } }),
    prisma.contactInquiry.findMany({ orderBy: { createdAt: 'desc' }, take: 5 }),
  ]);

  res.json({
    roomCount: totalRooms,
    menuItemCount: totalMenuItems,
    experienceCount: totalExperiences,
    galleryCount: totalGallery,
    roomReservationCount: roomReservations.length,
    diningReservationCount: diningReservations.length,
    experienceBookingCount: experienceBookings.length,
    inquiryCount: totalInquiries,
    userCount: totalUsers,
    subscriberCount: totalSubscribers,
    recentInquiries,
    recentRoomReservations: roomReservations,
    recentDiningReservations: diningReservations,
    recentExperienceBookings: experienceBookings,
  });
}
