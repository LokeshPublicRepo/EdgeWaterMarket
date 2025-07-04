import { getEnv } from "../config/env.loader";

export function getBaseURL():string {
  return getEnv("BASE_URL");
}