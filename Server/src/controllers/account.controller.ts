import UserModel from '../models/user.model';

export const getAccountInfo = function (req, res) {
  const id = req.params.id;
  UserModel.findById(id)
  .then(userResult => {
    if (userResult) {
      userResult.createdAt = undefined;
      userResult.updatedAt = undefined;
      userResult.token = undefined;
      userResult.password = undefined;
      userResult.__v = undefined;
      return res.status(200).json({
        user: userResult
      });
    } else {
      return res.status(404).json({
        user: null
      });
    }
  })
  .catch(err=>{
    return res.status(500).json({
      message:"Error while find account info: "+err.message
    });
  })
}