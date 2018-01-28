import faker from 'faker'
import _ from 'lodash'

class Fake {

  emailRes() {
    const response = []  
    const resourceLength = 20
    
    _.times(20, () => {
      const resObj = {
        name: faker.name.findName(),
        email: faker.internet.email()
      }
      response.push(resObj)
    }) 
    return response;
  }
}

export default Fake
