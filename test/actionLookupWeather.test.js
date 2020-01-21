const ActionLookupWeather = require('../src/actionHandlers/actionLookupWeather');

describe('ActionLookupWeather', () => {
  let action;
  let weatherServiceMock;

  beforeEach(() => {
    weatherServiceMock = {
      lookupWeather: jest.fn(),
    };
    action = new ActionLookupWeather(weatherServiceMock);
  });

  it("should have correct name", () => {
    expect(action.actionName).toBe("lookupWeather");
  });

  it("should lookup weather of city in service", () => {
    action.handle({ city: "foo" });

    expect(weatherServiceMock.lookupWeather.mock.calls.length).toBe(1);
    expect(weatherServiceMock.lookupWeather.mock.calls[0][0]).toBe("foo");
  });

  it("should return weather obtained in service", async () => {
    weatherServiceMock.lookupWeather.mockReturnValue(
      Promise.resolve({ foo: "bar" })
    );
    const {weather} = await action.handle({city: "foo"});

    expect(weather).toEqual({ foo: "bar" });
  });
});
