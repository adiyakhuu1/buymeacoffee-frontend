export type UserInfoForm = {
  name: string;
  about: string;
  socialMediaURL: string;
  avatarImage: string;
};
export type UserCardInfo = {
  country: string;
  firstName: string;
};
export type donation = {
  id: string;
  amount: number;
  specialMessage: string;
  socialURLOrBuyMeACoffee: string;
  createdAt: Date;
  donor: user;
};
export type user = {
  id: string;
  email: string;
  password: string;
  username: string;
  profile: profile;
  recievedDonations: donation[];
  sendDonation: donation[];
  bankCard: string;
};
export type profile = {
  id: string;
  name: string;
  about: string;
  avatarImage: string;
  socialMediaURL: string;
  backgroundImage: string;
  successMessage: string;
  userId: string;
};
