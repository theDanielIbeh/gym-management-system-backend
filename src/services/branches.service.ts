import { Service } from 'typedi';
import { HttpException } from '@exceptions/httpException';
import { Branch } from '@interfaces/branches.interface';
import { BranchModel } from '@models/branches.model';
import { UserModel } from '@/models/users.model';

@Service()
export class BranchService {
  public async findAllBranches(): Promise<Branch[]> {
    const branchs: Branch[] = await BranchModel.find().populate('admin').populate('staff').populate('users');
    return branchs;
  }

  public async findBranchById(branchId: string): Promise<Branch> {
    const findBranch: Branch = (await BranchModel.findOne({ _id: branchId }).populate('admin').populate('users'));
    if (!findBranch) throw new HttpException(409, "Branch doesn't exist");

    return findBranch;
  }

  public async createBranch(branchData: Branch): Promise<Branch> {
    const findBranch: Branch = await BranchModel.findOne({ name: branchData.name });
    if (findBranch) throw new HttpException(409, `A branch with the name ${branchData.name} already exists`);

    const createBranchData: Branch = await BranchModel.create({ ...branchData });

    return createBranchData;
  }

  public async updateBranch(branchId: string, branchData: Branch): Promise<Branch> {
    if (branchData.name) {
      const findBranch: Branch = await BranchModel.findOne({ name: branchData.name });
      if (findBranch && findBranch._id != branchId) throw new HttpException(409, `This name ${branchData.name} already exists`);
    }

    const updateBranchById: Branch = await BranchModel.findByIdAndUpdate(branchId, { branchData });
    if (!updateBranchById) throw new HttpException(409, "Branch doesn't exist");

    return updateBranchById;
  }

  public async assignAdminToBranch(branchId: string, adminUserId: string): Promise<Branch> {
    // Check if the user exists and has an admin role
    const adminUser = await UserModel.findOne({ _id: adminUserId });
    console.log(adminUser);
    if (!adminUser) {
      throw new HttpException(409, 'User does not exist');
    }

    if (adminUser.role !== 'Admin') {
      throw new HttpException(409, 'This User can not be an Admin');
    }

    // Update the branch with the new admin
    const updatedBranch: Branch = await BranchModel.findByIdAndUpdate(branchId, { admin: adminUserId }, { new: true }).populate('admin');

    if (!updatedBranch) {
      throw new HttpException(409, "Branch doesn't exist");
    }

    return updatedBranch;
  }

  public async addStaffToBranch(branchId: string, userId: string): Promise<Branch> {
    // Check if the user exists (and optionally check for appropriate role)
    const user = await UserModel.findById(userId /*, { role: 'staff' } */);
    if (!user) {
      throw new HttpException(409, 'User does not exist');
    }
    if (user.role !== 'Staff') {
      throw new HttpException(409, 'User is not a Staff Member');
    }
    // Append the user to the staff array of the branch
    const updatedBranch: Branch = await BranchModel.findByIdAndUpdate(
      branchId,
      { $addToSet: { staff: userId } }, // This adds the staff member without duplicating if they're already in the array
      { new: true },
    ).populate('staff');

    if (!updatedBranch) {
      throw new HttpException(409, "Branch doesn't exist");
    }

    return updatedBranch;
  }

  public async addUserToBranch(branchId: string, userId: string): Promise<Branch> {
    // Check if the user exists (and optionally check for appropriate role)
    const user = await UserModel.findById(userId /*, { role: 'user' } */);
    if (!user) {
      throw new HttpException(409, 'User does not exist');
    }
    if (user.role !== 'User') {
      throw new HttpException(409, 'User is not a User Member');
    }
    // Append the user to the staff array of the branch
    const updatedBranch: Branch = await BranchModel.findByIdAndUpdate(
      branchId,
      { $addToSet: { users: userId } }, // This adds the user member without duplicating if they're already in the array
      { new: true },
    ).populate('users');

    if (!updatedBranch) {
      throw new HttpException(409, "Branch doesn't exist");
    }

    return updatedBranch;
  }

  public async deleteBranch(branchId: string): Promise<Branch> {
    const deleteBranchById: Branch = await BranchModel.findByIdAndDelete(branchId);
    if (!deleteBranchById) throw new HttpException(409, "Branch doesn't exist");

    return deleteBranchById;
  }
}
