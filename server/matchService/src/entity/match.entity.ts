export class MatchEntity {
    public readonly userId: string;
    public readonly likedUserId: string;
    public readonly matchDate?: Date;

    constructor(userId: string, likedUserId: string, matchDate?: Date) {
      this.userId = userId;
      this.likedUserId = likedUserId;
      this.matchDate = matchDate;
      // Initialize other fields if needed
      // this.matchedUserName = matchedUserName;
      // this.matchedUserImage = matchedUserImage;
    }
  }
  