let pendingRecruitment = undefined;

module.exports = {
  set(players) {
    pendingRecruitment = players;
  },
  end() {
    pendingRecruitment = undefined;
  },
  get players() {
    return pendingRecruitment;
  },
  get isInProgress() {
    return pendingRecruitment !== undefined;
  }
};
