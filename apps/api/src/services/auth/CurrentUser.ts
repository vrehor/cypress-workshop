/**
 * Holds the data about currently signed in entity
 * Provides basic operations
 */
import {Service} from "typedi";

@Service()
export class CurrentUser {
  tokenData: { user_id: string } | null = null;

  initializeFromToken(tokenData: { user_id: string } | null) {
    const scopedCurrentUser = new CurrentUser();
    scopedCurrentUser.tokenData = tokenData;
    return scopedCurrentUser;
  }
}
