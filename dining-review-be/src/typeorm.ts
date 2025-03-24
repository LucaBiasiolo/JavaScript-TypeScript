import 'reflect-metadata';
import { Column, DataSource, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { Entity } from 'typeorm';

@Entity()
@Unique(['username'])
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    username: string

    @Column()
    password: string

    @Column()
    city: string

    @Column()
    state: string

    @Column({name: 'zip_code'})
    zipcode: number

    @Column({name: 'interest_peanut_allergy'})
    interestPeanutAllergy: boolean

    @Column({name: 'interst_egg_allergy'})
    interestEggAllergy: boolean

    @Column({name: 'interest_dairy_allergy'})
    interestDairyAllergy: boolean

    @Column({name: 'is_admin', default: false, nullable: true})
    isAdmin: boolean
}

@Entity()
@Unique(['name'])
export class Restaurant {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    city: string;

    @Column({name: 'zip_code'})
    zipcode: number;

    @Column()
    state: string;

    @Column({name:'overall_score',nullable: true})
    overallScore: number;

    @Column({name:'peanut_score',nullable: true})
    peanutScore: number;

    @Column({name:'egg_score',nullable: true})
    eggScore: number;

    @Column({name: 'dairy_score',nullable: true})
    dairyScore: number;
}

export const AppDataSource = new DataSource({
    type: 'sqlite',
    database: 'database',
    synchronize: true,
    entities: [User, Restaurant],
    logging: ['error'],
    dropSchema: true
});

(async () => {
    await AppDataSource.initialize();
    const userRepository = AppDataSource.getRepository(User);
    const restaurantRepository = AppDataSource.getRepository(Restaurant);

    // fixme: for some reason these queries are launched twice, causing node error
    await userRepository.save({ username: 'admin', password: 'password', zipcode: 36043, city: 'Camisano Vicentino', state: 'Italy', interestPeanutAllergy: true, interestEggAllergy: true, interestDairyAllergy: true, isAdmin: true });
    await userRepository.save({ username: 'Luca Biasiolo', password: 'password2', zipcode: 36047, city: 'Montegalda',state: 'Italy', interestPeanutAllergy: false, interestEggAllergy: false, interestDairyAllergy: false, isAdmin: false });

    await restaurantRepository.save({ name: 'La Moma', city: 'Camisano Vicentino', state: 'Italy', zipcode: 36043 });
    await restaurantRepository.save({ name: 'Red Quill', city: 'Vicenza', zipcode: 36100, state: 'Italy' })
    await restaurantRepository.save({ name: 'Al Vecchio Luppolo', city: 'Torri di Quartesolo', zipcode: 36054, state: 'Italy' })
})();