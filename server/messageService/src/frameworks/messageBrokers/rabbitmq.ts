import amqp from "amqplib";
import { messageUsecase } from "../../usecases/messageUsecase";

export class rabbitmq {
  private Connection: amqp.Connection | null = null;
  private Channel: amqp.Channel | any = null;
  constructor(public messageUsecase: messageUsecase) {}

  async initialize() {
    try {
      const rabbitmqUrl = "amqp://localhost:5672";
      this.Connection = await amqp.connect(rabbitmqUrl);
      this.Channel = await this.Connection.createChannel();
      console.log("The connection is established");
    } catch (err) {
      console.log(err, "The connection is not established");
      process.exit(1);
    }
  }

  async messageConsumer() {
    if (!this.Channel) {
      await this.initialize();
    }
    if (this.Channel) {
      const queue = "messageDataQueue";
      await this.Channel.assertQueue(queue, { durable: true });
      await this.Channel.consume(
        queue,
        (msg: any) => {
          if (msg !== null && msg.content) {
            try {
              console.log("row message ", msg);

              const data = JSON.parse(msg.content.toString());
              console.log("Received message:", data);
              this.messageUsecase.addUser(data);
            } catch (error) {
              console.error("Error parsing message content:", error);
              console.log("Raw message content:", msg.content.toString());
            }
          }
        },
        { noAck: true }
      );
    } else {
      console.error("Failed to create a channel");
    }
  }

  async accessChatConsumer() {
    if (!this.Channel) {
      await this.initialize();
    }
    if (this.Channel) {
      const queue = "matchUserAdded";
      await this.Channel.assertQueue(queue, { durable: true });
      await this.Channel.consume(
        queue,
        (msg: any) => {
          if (msg !== null && msg.content) {
            try {
              console.log("row message ", msg);

              const data = JSON.parse(msg.content.toString());
              console.log("Received message:", data);
              const { userId , myid } = data;
               this.messageUsecase.accessChat( userId, myid );
            } catch (error) {
              console.error("Error parsing message content:", error);
              console.log("Raw message content:", msg.content.toString());
            }
          }
        },
        { noAck: true }
      );
    } else {
      console.error("Failed to create a channel");
    }
  }

  
}
