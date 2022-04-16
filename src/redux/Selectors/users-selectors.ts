import { createSelector } from "reselect";
import { AppStateType } from "../redux-store";

const getUsersDataSelector = (state: AppStateType) => {
    return state.usersPage.usersData;
}
export const getUsersData = createSelector(getUsersDataSelector, (usersData)=> {
    return usersData;
})
export const getPageSize = (state: AppStateType) => {
    return state.usersPage.pageSize;
}
export const getTotalUsersCount = (state: AppStateType) => {
    return state.usersPage.totalUsersCount;
}
export const getCurrentPage = (state: AppStateType) => {
    return state.usersPage.currentPage;
}
export const getIsFollowingInProgress = (state: AppStateType) => {
    return state.usersPage.isFollowingInProgress;
}
export const getIsFetching = (state: AppStateType) => {
    return state.usersPage.isFetching;
}