/**
 * Represents a poker tournament player.
 */
export type Player = {
  /**
   * Unique identifier for the player.
   */
  id: string;

  /**
   * Name of the player.
   */
  name: string;

  /**
   * Current score of the player.
   */
  score: number;

  /**
   * Calculated rank of the player (1 = top).
   */
  rank: number;
};
