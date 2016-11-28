import Profile from '../models/profile';

export default class ProfileAgent {

    /**
     *
     * @param page
     * @param limit
     * @param lean
     * @returns {*|Promise}
     */
    static async getProfilesPages(page = 1, limit = 10, lean = true){
        return await Profile.paginate({}, {page, limit, lean});
    }

    static async searchProfilesByQuery(query = {}, page = 1, limit = 10, lean = true){
        return await Profile.paginate(query, {page, limit, lean});
    }
    
    static async getProfileById(profileId){

        return await Profile.findById(profileId);
    }

    static async updateProfile(profile){
        let {ok} = await Profile.update(
            {url: profile.url},
            {$setOnInsert: profile},
            {upsert: true},
        );
        return ok;
    }
}