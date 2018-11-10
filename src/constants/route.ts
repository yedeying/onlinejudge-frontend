// 路由
export enum Path {
  ROOT = '/',
  TRAINING = '/training',
  CONTESTS = '/contests',
  ISSUES = '/issues',
  LOGIN = '/login',
  REGISTER = '/register',
  TRAINING_PROBLEM = '/training/problem/:problemNo',
  TRAINING_PROBLEMS = '/training/problems',
  TRAINING_PROBLEMS_NO = '/training/problems/:no',
  TRAINING_STATUS = '/training/status',
  TRAINING_RANKLIST = '/training/ranklist',
  CONTESTS_PROBLEMS = '/contests/:id/problems',
  CONTESTS_STATUS = '/contests/:id/status',
  CONTESTS_RANKLIST = '/contests/:id/ranklist',
  CONTESTS_STATISTICS = '/contests/:id/statistics'
}

// 请求
export enum URL {
  ROOT = '/',
  TRAINING = '/training',
  CONTESTS = '/contests',
  ISSUES = '/issues',
  LOGIN = '/login',
  REGISTER = '/register',
  TRAINING_PROBLEM = '/training/problem/:problemNo',
  TRAINING_PROBLEMS = '/training/problems',
  TRAINING_PROBLEMS_NO = '/training/problems/:no',
  TRAINING_STATUS = '/training/status',
  TRAINING_RANKLIST = '/training/ranklist',
  CONTESTS_PROBLEMS = '/contests/:id/problems',
  CONTESTS_STATUS = '/contests/:id/status',
  CONTESTS_RANKLIST = '/contests/:id/ranklist',
  CONTESTS_STATISTICS = '/contests/:id/statistics'
}
