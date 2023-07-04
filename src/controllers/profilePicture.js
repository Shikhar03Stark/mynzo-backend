import path from 'path';
import * as uuid from 'uuid';
import models from '../models/index.js';
import properties from '../config/properties.js';
import StorageType from '../models/enums/StorageType.js';

export const uploadProfilePictureProtected = async (req, res, next) => {
    try {
        const image = req.files.image;
        const userId = req.user.id;

        const extname = path.extname(image.name);
        const filename = `media-${uuid.v4()}${extname}`;
        image.name = filename;

        const dirPath = ['public', 'static'];
        const hostPath = `/static/`


        let profilePicture = await models.ProfilePicture.findOne({
            where: {
                user_id: userId,
            }
        });

        if (!profilePicture) {
            profilePicture = models.ProfilePicture.build();
            profilePicture.user_id = userId;
        }

        const uploadPath = hostPath + filename;
        profilePicture.url = properties.webhost + uploadPath;
        profilePicture.alt = `Profile picture of ${userId}`;
        profilePicture.size = image.size;
        profilePicture.storage = StorageType.local;

        await image.mv(path.resolve(...dirPath, filename));

        await profilePicture.save();

        res.sendStatus(201);

    } catch (error) {
        next(error);
    }
}