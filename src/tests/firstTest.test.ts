import User from "@models/User";

test("it should be ok", () => {
  const user = new User();
  user.name = "Danilo";

  expect(user.name).toBe("Danilo");
});
