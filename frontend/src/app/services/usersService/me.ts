import type { User } from "../../entities/User";
import { httpClient } from "../httpClient";

type MeResponse = User;

export async function me() {
  const { data } = await httpClient.get<MeResponse>("/users/me");

  return data;
}


