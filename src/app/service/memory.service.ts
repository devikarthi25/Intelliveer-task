import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const events = [
      { id: 1, eventName: 'Tech Conference', eventDate: '2025-04-10', 
        location: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3942.810266854571!2d78.13805467352579!3d8.80388849247516!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b03ef005b7715f3%3A0x7f35c5112ebc8397!2sThoothukudi%20Old%20Bus%20stand!5e0!3m2!1sen!2sin!4v1742146112823!5m2!1sen!2sin',
      price: 100, seats: 4, description: 'A tech event' },
      { id: 2, eventName: 'Angular Workshop', eventDate: '2025-05-15', 
        location: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3942.810266854571!2d78.13805467352579!3d8.80388849247516!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b03ef005b7715f3%3A0x7f35c5112ebc8397!2sThoothukudi%20Old%20Bus%20stand!5e0!3m2!1sen!2sin!4v1742146112823!5m2!1sen!2sin',
        price: 150, seats: 10, description: 'Learn Angular' }
    ];
    return { events };
  }
}
