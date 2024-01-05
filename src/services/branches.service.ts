import { Service } from 'typedi';
import { HttpException } from '@exceptions/httpException';
import { Branch } from '@interfaces/branches.interface';
import { BranchModel } from '@models/branches.model';

@Service()
export class BranchService {
  public async findAllBranches(): Promise<Branch[]> {
    const branchs: Branch[] = await BranchModel.find();
    return branchs;
  }

  public async findBranchById(branchId: string): Promise<Branch> {
    const findBranch: Branch = await BranchModel.findOne({ _id: branchId });
    if (!findBranch) throw new HttpException(409, "Branch doesn't exist");

    return findBranch;
  }

  public async createBranch(branchData: Branch): Promise<Branch> {
    const findBranch: Branch = await BranchModel.findOne({ name: branchData.name });
    if (findBranch) throw new HttpException(409, `This name ${branchData.name} already exists`);

    const createBranchData: Branch = await BranchModel.create({ branchData });

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

  public async deleteBranch(branchId: string): Promise<Branch> {
    const deleteBranchById: Branch = await BranchModel.findByIdAndDelete(branchId);
    if (!deleteBranchById) throw new HttpException(409, "Branch doesn't exist");

    return deleteBranchById;
  }
}
