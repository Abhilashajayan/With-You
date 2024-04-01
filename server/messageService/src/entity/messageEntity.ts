export class MessageEntity {
    public readonly id: string;
    public readonly senderId: string;
    public readonly recipientId: string;
    public readonly content: string;
    public readonly timestamp: Date;
  
    constructor(
      id: string,
      senderId: string,
      recipientId: string,
      content: string,
      timestamp: Date
    ) {
      this.id = id;
      this.senderId = senderId;
      this.recipientId = recipientId;
      this.content = content;
      this.timestamp = timestamp;
    }
  }
  