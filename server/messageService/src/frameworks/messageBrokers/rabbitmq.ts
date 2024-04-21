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
      console.log("the connection is established");
    } catch (err) {
      console.log(err, "the connection is not established");
      process.exit(1);
    }
  }
}
