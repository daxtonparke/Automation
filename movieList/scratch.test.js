const {Builder, Capabilities, By} = require('selenium-webdriver')

require('chromedriver')

const driver = new Builder(). withCapabilities(Capabilities.chrome()).build()

beforeAll(async () => await driver.get('http://127.0.0.1:5500/movieList/index.html'))

afterAll(async () => await driver.quit())




it('should delete a movie', async () => {
    await driver.findElement(By.xpath('//input')).sendKeys('scotty boy\n')
    await driver.findElement(By.xpath('//li/button')).click()
    let movies; 
    await driver.findElements(By.xpath('//li')).then(elements=> movies = (elements.length === 0)) 
    expect(movies).toBeTruthy()
})

it('should check if messages appear', async () => {
    await driver.findElement(By.xpath('//input')).sendKeys('scotty boy\n')
    await driver.findElement(By.xpath('//li/button')).click()
    const messageText = await driver.findElement(By.id('message')).getText()
    expect(messageText).toEqual('scotty boy deleted!')
})

it('should delete all movies', async () => {
    let movies; 
    await driver.findElements(By.xpath('//li')).then(elements=> movies = (elements.length === 0)) 
    await driver.findElement(By.xpath('//input')).sendKeys('\n\n\n\n\n\n\n\n\n\n\n')
    let elements = await driver.findElements(By.xpath('//li'))
    for(let i = 0; i<elements.length; i++){
        await driver.findElement(By.xpath('//li/button')).click()
    }
    expect(movies).toBeTruthy()
    await driver.sleep(5000)
})